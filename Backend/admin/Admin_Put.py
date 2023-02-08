import boto3
from boto3.dynamodb.conditions import Attr
from os import getenv

region_name = getenv("APP_REGION")


def lambda_handler(event, context):
    
    username = event['username']
    password = event['password']
    email = event['email']

    key = {
        'username': username
    }

    performances_table = boto3.resource(
        'dynamodb', region_name=region_name).Table('Admins')
    response = performances_table.update_item(
        UpdateExpression='set password=:p, email=:e',
        ExpressionAttributeValues={
            ':p': password,
            ':e': email
        },
        Key=key,
        ReturnValues="UPDATED_NEW"
    )

    return response['Attributes']
