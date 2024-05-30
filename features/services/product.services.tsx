import  {Product} from '../models'

const itemsURL = 'http://192.168.1.101:3000/644/products'

export class ProductServices {
    createProduct = (product: Product) => {
        return fetch(itemsURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${product.accessToken}` 
                
            },
            body: JSON.stringify(product)
        
        })
    }
}