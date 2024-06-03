import {View, Text} from 'react-native';
import {ProductListView} from '../product-list-view/product-list-view.component';
import {useEffect, useState} from 'react';
import {Product} from '../../models';
import {ProductServices} from '../../services/product.services';
const productServices = new ProductServices();
export const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    productServices
      .getProductList()
      .then(async response => await response.json()).then((data: Product[])=>{
        setProducts(data)
      })
      .catch(error => console.error('get request failed: ', error));
    

    }, []);

  return (
    <View>
      <ProductListView products={products} />
    </View>
  );
};
