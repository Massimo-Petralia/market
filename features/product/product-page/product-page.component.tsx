import {useContext} from 'react';
import {Pressable, Text, View} from 'react-native';
import {ProductView} from '../product-view/product-view.component';
import {Product} from '../../models';
import {userContext} from '../../contexts/user.context';

export const ProductPage = () => {
  const onCreateItem = (item: Product) => {};
  const contextUserData = useContext(userContext);
  return (
    <View style={{flex: 1}}>
      <ProductView onCreateItem={onCreateItem} />
      <Pressable onPress={() => console.log('context: ', contextUserData.userData)}>
        <Text>read context</Text>
      </Pressable>
    </View>
  );
};
