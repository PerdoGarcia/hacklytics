import boto3
from botocore.exceptions import ClientError
import os

class S3Instance:
    def __init__(self, bucket_name=None):
        """
        Initialize S3 client with a specific bucket or from environment variable

        Args:
            bucket_name (str, optional): Name of the S3 bucket to interact with
        """
        self.s3_client = boto3.client('s3')
        self.bucket_name = bucket_name or os.getenv('S3_BUCKET_NAME')

        if not self.bucket_name:
            raise ValueError("S3 Bucket name must be provided either as an argument or in environment variable S3_BUCKET_NAME")

    def upload_file(self, file_path, object_name=None):
        """
        Upload a file to the S3 bucket

        Args:
            file_path (str): Path to the file to upload
            object_name (str, optional): S3 object name. If not specified, file_path is used

        Returns:
            str or None: URL of the uploaded file, or None if upload failed
        """
        if object_name is None:
            object_name = os.path.basename(file_path)

        try:
            self.s3_client.upload_file(file_path, self.bucket_name, object_name)
            return f"https://{self.bucket_name}.s3.amazonaws.com/{object_name}"
        except ClientError as e:
            print(f"Error uploading file: {e}")
            return None

    def download_file(self, object_name, file_path=None):
        """
        Download a file from the S3 bucket
        """
        if file_path is None:
            file_path = object_name

        try:
            self.s3_client.download_file(self.bucket_name, object_name, file_path)
            return file_path
        except ClientError as e:
            print(f"Error downloading file: {e}")
            return None

    def list_files(self, prefix=''):
        """
        List files in the bucket, optionally filtered by prefix
        """
        try:
            response = self.s3_client.list_objects_v2(Bucket=self.bucket_name, Prefix=prefix)
            return [obj['Key'] for obj in response.get('Contents', [])]
        except ClientError as e:
            print(f"Error listing files: {e}")
            return []

# Create a single instance to be imported by other modules
s3_instance = S3Instance()