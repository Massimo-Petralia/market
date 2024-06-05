import {View, Text} from 'react-native';
import {ProductListView} from '../product-list-view/product-list-view.component';
import {useContext, useEffect, useState} from 'react';
import {Product} from '../../models';
import {ProductServices} from '../../services/product.services';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductPage} from '../../product/product-page/product-page.component';
import {productContext} from '../../context/market.context';
const Stack = createNativeStackNavigator<RootStackParamList>();
const productServices = new ProductServices();

export type RootStackParamList = {
  Products: undefined;
  Product: {id: number | undefined};
};

export const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const context = useContext(productContext);
  useEffect(() => {
    productServices
      .getProductList()
      .then(async response => await response.json())
      .then((data: Product[]) => {
        setProducts(data);
        context.products = data;
        console.log(
          'data length: ',
          data.length,
          'context length: ',
          context.products.length,
        );
      })
      .catch(error => console.error('get request failed: ', error));
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <ProductListView products={products} /> */}
      <productContext.Provider
        value={{
          products: products,
        }}>
        <Stack.Navigator initialRouteName="Products">
          <Stack.Screen name="Products" component={ProductListView} />
          <Stack.Screen name="Product" component={ProductPage} />
        </Stack.Navigator>
      </productContext.Provider>
    </View>
  );
};
