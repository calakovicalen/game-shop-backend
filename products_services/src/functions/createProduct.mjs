import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const PRODUCTS_TABLE = 'products-table';

export async function createProduct(event) {
  try {
    const { title, description, price } = JSON.parse(event.body);

    const productId = uuid();

    const productParams = {
      TableName: PRODUCTS_TABLE,
      Item: {
        productId,
        title,
        description,
        price,
      },
    };

    await dynamodb.put(productParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ productId }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `${error}` }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
}
