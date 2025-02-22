from flask import Blueprint, jsonify
from config import OPENAI_API_KEY

openai_bp = Blueprint('openai', __name__)

@openai_bp.route('/api/openai/something', methods=['GET'])
def openai_endpoint():
    # Your OpenAI logic here
    return jsonify({"message": "OpenAI endpoint"})