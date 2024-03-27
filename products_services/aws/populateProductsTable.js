import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = 'products-table';

const products = [
  {
    description: 'Stealth game full of history',
    productId: '0dc22571-881a-411d-b20e-71c5c7b68c3c',
    price: 69.99,
    title: `Assassin's creed`,
  },
  {
    description: 'Game for real gangsters',
    productId: 'c05725f9-613c-4e8b-b465-5636eeab1223',
    price: 39.99,
    title: `Grand Theft Auto`,
  },
  {
    description: 'Game for those who want to forget about life',
    productId: '6e514e91-ae3c-4a8b-85f5-c51c047bf549',
    price: 99.99,
    title: `World of Warcraft`,
  },
  {
    description: 'Best FPS game',
    productId: '65998305-5c73-49f7-8fad-e7190574185f',
    price: 19.99,
    title: `Counter Strike`,
  },
];

async function populateProductsTable() {
  try {
    for (const product of products) {
      const productParams = {
        TableName: PRODUCTS_TABLE,
        Item: product,
      };

      await dynamodb.put(productParams).promise();
      console.log(`Product added: ${product.title}`);
    }
    console.log('All products added successfully.');
  } catch (error) {
    console.error('Error populating products table:', error);
  }
}

populateProductsTable();
