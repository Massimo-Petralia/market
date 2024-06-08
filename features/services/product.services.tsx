import {Product} from '../models';

const itemsURL = 'http://192.168.1.102:3000/644/products';

export class ProductServices {
  createProduct = (product: Product, accessToken: string | undefined) => {
    return fetch(itemsURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });
  };

  getProductList = () => {
    return fetch(itemsURL, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  };

  getProduct = (id: number) => {
    return fetch(`${itemsURL}/${id}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  };

  updateProduct = (product: Product, accessToken: string) => {
    return fetch(`${itemsURL}/${product.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product)
    })
  }

  deleteProduct = (id: number, accessToken: string) => {
      return fetch(`${itemsURL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
  }

}
