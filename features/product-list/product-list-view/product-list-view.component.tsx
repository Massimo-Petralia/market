import {View, Text, Pressable} from 'react-native';
import {Product} from '../../models';
import PagerView from 'react-native-pager-view';
import {Card} from '@rneui/themed';
import {ProductPage} from '../../product/product-page/product-page.component';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {productContext} from '../../contexts/product.context';

import {RootStackParamList} from '../product-list-page/product-list-page.component';



export const ProductListView = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Products'>) => {
  const context = useContext(productContext);
  return (
    <View>
      <PagerView useNext initialPage={0}>
        {context.products.length !== 0 ? (
          context.products.map((product, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => navigation.navigate('Product', {id: product.id})}>
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
