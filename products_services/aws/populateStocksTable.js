import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const STOCKS_TABLE = 'stocks-table';

const stocks = [
  {
    productId: '0dc22571-881a-411d-b20e-71c5c7b68c3c',
    count: 20,
  },
  {
    productId: 'c05725f9-613c-4e8b-b465-5636eeab1223',
    count: 35,
  },
  {
    productId: '6e514e91-ae3c-4a8b-85f5-c51c047bf549',
    count: 3,
  },
  {
    productId: '65998305-5c73-49f7-8fad-e7190574185f',
    count: 28,
  },
];

async function populateStocksTable() {
  try {
    for (const stock of stocks) {
      const stockParams = {
        TableName: STOCKS_TABLE,
        Item: stock,
      };

      await dynamodb.put(stockParams).promise();
      console.log(`Stock added: ${stock.productId}`);
    }
    console.log('All stocks added successfully.');
  } catch (error) {
    console.error('Error populating products table:', error);
  }
}

populateStocksTable();
