from flask import Blueprint, jsonify, request
import requests
from config import KALSHI_API_TOKEN
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


@kalshi_bp.route('/api/markets', methods=['GET'])
def get_markets():
    ticker = request.args.get('ticker')

    if not ticker:
        return jsonify({'error': 'ticker is required'}), 400

    try:
        # Make request to Kalshi API
        response = requests.get(
            f'https://api.elections.kalshi.com/trade-api/v2/markets/{ticker}',
            headers={
                'Authorization': f'Bearer {KALSHI_API_TOKEN}'
            }
        )

        # Check if request was successful
        response.raise_for_status()

        data = response.json()["market"]

        return jsonify(data)

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

        data = response.json()

        return jsonify(data)

    except requests.exceptions.RequestException as error:
        print(f'Error fetching candlestick data: {error}')
        return jsonify({
            'error': 'API request failed',
            'message': str(error)
        }), 500

@kalshi_bp.route('/api/all', methods=['GET'])
def get_all():
    try:
        # Get list of events
        response = requests.get(
            f'https://api.elections.kalshi.com/trade-api/v2/events?limit=25&status=open',
            headers={
                'Authorization': f'Bearer {KALSHI_API_TOKEN}'
            }
        )
        response.raise_for_status()
        data = response.json()

        markets = []

        # Get detailed info for each event
        for event in data["events"]:
            event_ticker = event["event_ticker"]

            # Get detailed event info using the existing endpoint
            event_response = requests.get(
                f'https://api.elections.kalshi.com/trade-api/v2/events/{event_ticker}',
                headers={
                    'Authorization': f'Bearer {KALSHI_API_TOKEN}'
                }
            )
            event_response.raise_for_status()
            event_details = event_response.json()

            for market in event_details["markets"]:
                if market["status"] == "closed" or market["market_type"] != "binary":
                    continue
                if market["volume"] <= 5:
                    continue

                market_details = {
                    "series_ticker": event_details["event"]["series_ticker"],
                    "title": get_market_display_title(market, event_details["event"]["title"]),
                    "ticker": market["ticker"],
                    "yes_ask": market["yes_ask"],
                    "no_bid": market["no_bid"],
                    "url": generate_kalshi_url(event_details["event"]["series_ticker"], event_details["event"]["event_ticker"])
                }
                markets.append(market_details)

        return jsonify(markets)

    except requests.exceptions.RequestException as error:
        print('Error fetching event data:', str(error))
        return jsonify({'error': str(error)}), 500

def get_market_display_title(market, event_title):
    # Start with event title
    display_title = event_title

    # If yes_sub_title exists and isn't empty
    if market.get("yes_sub_title") and market["yes_sub_title"].strip():
        return f"{display_title} - {market['yes_sub_title']}"

    # If only subtitle exists
    elif market.get("subtitle") and market["subtitle"].strip():
        return f"{display_title} - {market['subtitle']}"

    # If title exists (though in your example it's empty)
    elif market.get("title") and market["title"].strip():
        return f"{display_title} - {market['title']}"

    # Fallback to event title + ticker
    else:
        return f"{display_title} - {market['ticker']}"

def parse_markets():
    # Get list of events
    pass

def generate_kalshi_url(series_ticker, event_ticker):
    # Lowercase the series ticker.
    series_slug = series_ticker.lower()
    # For the event slug, you might simply use the event ticker lowercased,
    # or you might need to transform it further (e.g., remove extra characters)
    event_slug = event_ticker.lower()
    return f"https://kalshi.com/markets/{series_slug}/{event_slug}"
