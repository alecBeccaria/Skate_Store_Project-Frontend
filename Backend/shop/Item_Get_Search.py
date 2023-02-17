import boto3
from os import getenv
from boto3.dynamodb.conditions import Key, Attr

region_name = getenv("APP_REGION")


def lambda_handler(event, context):
    response = read(event)
    return response


def read(event):
    # gets Database resource
    search = event['body-json']['search_term']

    dynamodb = boto3.resource('dynamodb', region_name=region_name)
    items_table = dynamodb.Table('Items')

    scan_kwargs = {
        'FilterExpression': Attr('name').contains(search) | Attr('description').contains(search)
    }
    Db_Category_Items = items_table.scan(**scan_kwargs)
    Category_Items = Db_Category_Items['Item']
    return Category_Items
