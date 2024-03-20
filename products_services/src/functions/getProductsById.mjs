import { products } from '../data.mjs';

export async function getProductsById(event) {
  const foundProduct = products.find(
    product => product.id === event.pathParameters.productId
  );
  return foundProduct
    ? {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: JSON.stringify(foundProduct),
      }
    : {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: JSON.stringify({ message: 'Product not found' }),
      };
}
