from flask import Blueprint, request, jsonify, send_file
from instance import s3_instance
import os

s3_bp = Blueprint('s3', __name__, url_prefix='/api/s3')

@s3_bp.route('/upload', methods=['POST'])
def upload_file():
    """
    Upload a file to S3 bucket
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Save file temporarily
    temp_path = f"/tmp/{file.filename}"
    file.save(temp_path)

    try:
        # Upload to S3
        url = s3_instance.upload_file(temp_path, file.filename)
        # Clean up temp file
        os.remove(temp_path)

        if url:
            return jsonify({'url': url}), 200
        return jsonify({'error': 'Upload failed'}), 500

    except Exception as e:
        # Clean up temp file in case of error
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return jsonify({'error': str(e)}), 500

@s3_bp.route('/files', methods=['GET'])
def list_files():
    """
    List all files in S3 bucket
    """
    prefix = request.args.get('prefix', '')
    files = s3_instance.list_files(prefix)
    return jsonify({'files': files}), 200

@s3_bp.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    """
    Download a file from S3 bucket
    """
    try:
        temp_path = f"/tmp/{filename}"
        result = s3_instance.download_file(filename, temp_path)

        if result:
            # Send file and clean up
            response = send_file(temp_path, as_attachment=True)
            os.remove(temp_path)
            return response

        return jsonify({'error': 'Download failed'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500