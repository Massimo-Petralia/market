import  {Product} from '../models'

const itemsURL = 'http://192.168.1.107:3000/644/items'

export class ProductServices {
    createProduct = (product: Product) => {
        return fetch(itemsURL)
    }
}