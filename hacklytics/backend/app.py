from flask import Flask, session, request, jsonify
from flask_cors import CORS
from datetime import timedelta
import os
from dotenv import load_dotenv
from routes.kalshi import kalshi_bp
from routes.openai import openai_bp

# Load environment variables
load_dotenv()

# Get API keys
KALSHI_API_TOKEN = os.getenv('KALSHI_API_TOKEN')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

def create_app():
    app = Flask(__name__)

    # Configure CORS
    CORS(app,
        origins=["http://localhost:3000"],
        supports_credentials=True)

    # Register blueprints
    app.register_blueprint(kalshi_bp)
    app.register_blueprint(openai_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 8000))
    app.run(host='0.0.0.0', port=port)