from flask import Blueprint, request, Response, current_app, jsonify
import json
import openai

grok_bp = Blueprint('grok', __name__)

@grok_bp.route('/api/grok', methods=['POST'])
def grok():
    # Retrieve the API key from the Flask configuration.
    grok_api_key = current_app.config.get('GROK_API_KEY')
    if not grok_api_key:
        return jsonify({"error": "GROK_API_KEY not configured"}), 500

    # Create the OpenAI client with the API key from the config.
    client = openai.Client(
        api_key=grok_api_key,
        base_url="https://api.x.ai/v1",
    )

    # Get the messages from the POST payload.
    data = request.get_json()
    messages = data.get("messages", [])

    # Build your conversation with a system message.
    conversation = [
        {
            "role": "system",
            "content": (
                "You are a seasoned financial analyst who gives honest, no-BS insights like a real person, but respectful to the user. "
                "You specialize in arbitrage opportunities between Polymarket and Kalshi, using real-time X posts to analyze market trends and sentiment. "
                "Keep responses brief, direct, and actionable—explain how arbitrages work, guide users on using these platforms, and suggest specific trades based on current data. "
                "Highlight risks (like fees or timing) and rewards (guaranteed profit). Focus on executing trades to lock in spreads, not holding positions."
                "Be as concise but efficient as possible."
            )
        }
    ]
    conversation.extend(messages)


    # Request a streaming completion from the API.
    response = client.chat.completions.create(
        model="grok-2-1212",
        messages=conversation,
        max_tokens=256,
        stream=True  # Enable streaming response
    )

    def generate():
        try:
            for chunk in response:
                # Use attribute access instead of .get()
                try:
                    delta = chunk.choices[0].delta.content
                except AttributeError:
                    delta = ""
                if delta:
                    yield f"data: {json.dumps({'content': delta})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"


    return Response(generate(), mimetype="text/event-stream")
