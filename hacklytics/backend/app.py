from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from routes.kalshi import kalshi_bp
from routes.openai import openai_bp
from routes.grok import grok_bp

load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configure API keys here:
    app.config['KALSHI_API_TOKEN'] = os.getenv('KALSHI_API_TOKEN')
    app.config['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
    app.config['GROK_API_KEY'] = os.getenv('GROK_API_KEY')

    CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

    app.register_blueprint(kalshi_bp)
    app.register_blueprint(openai_bp)
    app.register_blueprint(grok_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
