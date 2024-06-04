import {createContext} from 'react';
import {Product} from '../models';

type ProductContext = {
  products: Product[];
};

export const productContext = createContext<ProductContext>({
  products: [],
});
