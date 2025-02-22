from flask import Blueprint, jsonify, request
import requests
from config import KALSHI_API_TOKEN
# import time
import time

kalshi_bp = Blueprint('kalshi', __name__)

@kalshi_bp.route('/api/events', methods=['GET'])
def get_event():
    # Get event_ticker from query parameters
    event_ticker = request.args.get('eventTicker')

    if not event_ticker:
        return jsonify({'error': 'eventTicker is required'}), 400

    try:
        # Make request to Kalshi API
        response = requests.get(
            f'https://api.elections.kalshi.com/trade-api/v2/events/{event_ticker}',
            headers={
                'Authorization': f'Bearer {KALSHI_API_TOKEN}'
            }
        )

        # Check if request was successful
        response.raise_for_status()

        # Return the data
        return jsonify(response.json())

    except requests.exceptions.RequestException as error:
        print('Error fetching event data:', str(error))
        return jsonify({'error': str(error)}), 500

@kalshi_bp.route('/api/candlesticks', methods=['GET'])
def get_candlesticks():
    # Get required parameters
    series_ticker = request.args.get('series_ticker')
    ticker = request.args.get('ticker')

    # Optional parameters with defaults
    period_interval = int(request.args.get('period_interval', 60))  # Default to 1 hour
    days = int(request.args.get('days', 7))  # Default to 7 days of data

    # Validate required parameters
    if not series_ticker or not ticker:
        return jsonify({
            'error': 'Missing required parameters',
            'message': 'series_ticker and ticker are required'
        }), 400

    # Validate period_interval
    if period_interval not in [1, 60, 1440]:
        return jsonify({
            'error': 'Invalid period_interval',
            'message': 'period_interval must be 1 (minute), 60 (hour), or 1440 (day)'
        }), 400

    try:
        # Calculate timestamps
        end_ts = int(time.time())
        start_ts = end_ts - (days * 24 * 60 * 60)

        # Make request to Kalshi API
        response = requests.get(
            f'https://api.elections.kalshi.com/trade-api/v2/series/{series_ticker}/markets/{ticker}/candlesticks',
            params={
                'start_ts': start_ts,
                'end_ts': end_ts,
                'period_interval': period_interval
            },
            headers={
                'Authorization': f'Bearer {KALSHI_API_TOKEN}',
                'Accept': 'application/json'
            }
        )

        # Check if request was successful
        response.raise_for_status()

        return jsonify(response.json())

    except requests.exceptions.RequestException as error:
        print(f'Error fetching candlestick data: {error}')
        return jsonify({
            'error': 'API request failed',
            'message': str(error)
        }), 500

    # status: open
    # https://api.elections.kalshi.com/trade-api/v2/events?limit=10

@kalshi_bp.route('/api/all', methods=['GET'])
def get_all():
    # Get event_ticker from query parameters
    try:
        # Make request to Kalshi API
        response = requests.get(
            f'https://api.elections.kalshi.com/trade-api/v2/events?limit=10&status=open',
            headers={
                'Authorization': f'Bearer {KALSHI_API_TOKEN}'
            }
        )

        # Check if request was successful
        response.raise_for_status()

        data = response.json()

        events = []

        for i in data["events"]:
            event_ticker = i["event_ticker"]
            title = i["title"]
            events.append({"event_ticker": event_ticker, "title": title})

        # Return the data
        return jsonify(events)

    except requests.exceptions.RequestException as error:
        print('Error fetching event data:', str(error))
        return jsonify({'error': str(error)}), 500
