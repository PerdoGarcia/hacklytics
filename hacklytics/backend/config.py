import os
from dotenv import load_dotenv

load_dotenv()

# API Keys
KALSHI_API_TOKEN = os.getenv('KALSHI_API_TOKEN')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Server Settings
PORT = int(os.getenv('PORT', 8000))
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')

# Flask Config
class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-change-this')
    DEBUG = os.getenv('FLASK_DEBUG', False)