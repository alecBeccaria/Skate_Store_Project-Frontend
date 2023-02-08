import boto3
from os import getenv


region_name = getenv("APP_REGION")

items_table = boto3.resource(
    'dynamodb',
    region_name=region_name).Table('Items')


def lambda_handler(event, context):
    Item = read_event(event)

    items_table.put_item(Item=Item)
    return Item


def read_event(event):
    name = event['name']
    category = event['category']
    price = event['price']
    manufacturer = event['phone']
    image = event['image']

    Item = {
        "name": name,
        "category": category,
        "price": price,
        "manufacturer": manufacturer,
        "image": image
    }

    return Item
