import {useContext} from 'react';
import {Pressable, Text, View} from 'react-native';
import {ProductView} from '../product-view/product-view.component';
import {Product} from '../../models';
import {userContext} from '../../contexts/user.context';

export const ProductPage = () => {
  const onCreateItem = (product: Product) => {
    console.log('product: ', product)
  };
  const contextUserData = useContext(userContext);
  return (
    <View style={{flex: 1}}>
      <ProductView onCreateItem={onCreateItem} />
    </View>
  );
};

// <Pressable onPress={() => console.log('context: ', contextUserData.userData)}><Text>read context</Text></Pressable>
