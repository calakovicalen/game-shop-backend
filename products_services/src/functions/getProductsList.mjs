import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = 'products-table';
const STOCKS_TABLE = 'stocks-table';

export async function getProductsList() {
  try {
    const productParams = {
      TableName: PRODUCTS_TABLE,
    };

    const productData = await dynamodb.scan(productParams).promise();

    const productIds = productData.Items.map(item => item.productId);

    const stockParams = {
      RequestItems: {
        [STOCKS_TABLE]: {
          Keys: productIds.map(productId => ({ productId })),
          ProjectionExpression: 'productId, #c',
          ExpressionAttributeNames: {
            '#c': 'count',
          },
        },
      },
    };

    const stockData = await dynamodb.batchGet(stockParams).promise();

    const productStockMap = {};
    stockData.Responses[STOCKS_TABLE].forEach(item => {
      productStockMap[item.productId] = item.count;
    });

    const productsWithStock = productData.Items.map(item => ({
      ...item,
      count: productStockMap[item.productId] || 0,
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(productsWithStock),
    };
  } catch (error) {
    console.error('Error getting products list:', error);
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
