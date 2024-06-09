import {View, Text, Pressable} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Card} from '@rneui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {ProductContext} from '../../context/market.context';

import {RootStackParamList} from '../../models/navigation-types';
import { useNavigation } from '@react-navigation/native';
import { ProductScreenNavigationProp } from '../../models/navigation-types';
import { Product } from '../../models/market-models';

export const ProductListView = (
//   {
//   navigation,
// }: NativeStackScreenProps<RootStackParamList, 'Products'>
//{products}: {products: Product[]}
) => {
  const context = useContext(ProductContext);
  const navigation = useNavigation<ProductScreenNavigationProp>()
  return (
    <View>
      <PagerView useNext initialPage={0}>
        {context.products.length !== 0 ? (
          context.products.map((product, index) => {
            return (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate('Product', {id: product.id})
                }>
                <Card>
                  <Card.Title>{product.name.toUpperCase()}</Card.Title>
                  <Card.Divider />
                  <Card.Image
                    source={{
                      uri: product.images[0],
                    }}
                  />
                </Card>
              </Pressable>
            );
          })
        ) : (
          <View key="0">
            <Text>no products present</Text>
          </View>
        )}
      </PagerView>
    </View>
  );
};
