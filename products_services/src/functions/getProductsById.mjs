import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = 'products-table';

export async function getProductById(event) {
  try {
    const productId = event.pathParameters.id;

    const productParams = {
      TableName: PRODUCTS_TABLE,
      Key: {
        id: productId,
      },
    };

    const data = await dynamodb.get(productParams).promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Product not found' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Error getting product by ID:', error);
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
