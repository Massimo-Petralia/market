import {useContext} from 'react';
import {Pressable, Text, View} from 'react-native';
import {ProductView} from '../product-view/product-view.component';
import {Product} from '../../models';
import {userContext} from '../../contexts/user.context';
import {ProductServices} from '../../services/product.services';
const productService = new ProductServices();
export const ProductPage = () => {
  const contextUserData = useContext(userContext);
  const onCreateItem = (product: Product) => {
    productService.createProduct({
      ...product,
      accessToken: contextUserData.userData?.accessToken,
      userId: contextUserData.userData?.user?.id,
    });
  };
  return (
    <View style={{flex: 1}}>
      <ProductView onCreateItem={onCreateItem} />
    </View>
  );
};

// <Pressable onPress={() => console.log('context: ', contextUserData.userData)}><Text>read context</Text></Pressable>
