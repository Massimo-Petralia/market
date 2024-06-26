import {View} from 'react-native';
import {ProductListView} from '../product-list-view/product-list-view.component';
import {useContext, useEffect, useState} from 'react';
import {Product} from '../../models/market-models';
import {ProductServices} from '../../services/product.services';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductPage} from '../../product/product-page/product-page.component';
import {productContext} from '../../context/market.context';
import {RootStackParamList} from '../../models/navigation-types';
import {useIsFocused} from '@react-navigation/native';
const Stack = createNativeStackNavigator<RootStackParamList>();
const productServices = new ProductServices();

export const ProductListPage = () => {
  const isFocused = useIsFocused();
  const [products, setProducts] = useState<Product[]>([]);
  const context = useContext(productContext);
  useEffect(() => {
    if (isFocused) {
      productServices
        .getProductList()
        .then(async response => await response.json())
        .then((data: Product[]) => {
          setProducts(data);
          context.products = data;
        })
        .catch(error => console.error('get request failed: ', error));
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <productContext.Provider
        value={{
          products: products,
        }}>
        {/* <Stack.Navigator initialRouteName="Products">
          <Stack.Screen name="Products" component={ProductListView} />
          <Stack.Screen name="Product" component={ProductPage} />
        </Stack.Navigator> */}
      <ProductListView />
      </productContext.Provider>
    </View>
  );
};
