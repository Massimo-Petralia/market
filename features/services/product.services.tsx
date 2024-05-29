import  {Product} from '../models'

const itemsURL = 'http://192.168.1.101:3000/644/items'

export class ProductServices {
    createProduct = (product: Product) => {
        return fetch(itemsURL)
    }
}