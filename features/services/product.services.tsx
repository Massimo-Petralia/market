import  {Product} from '../models'

const itemsURL = 'http://192.168.1.102:3000/644/products'

export class ProductServices {
    createProduct = (product: Product, accessToken: string|undefined) => {
        return fetch(itemsURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${( accessToken)}` 
                
            },
            body: JSON.stringify(product)
        
        })
    }
}