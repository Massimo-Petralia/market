import {Text, View} from 'react-native';
import {ItemView} from '../item-view/item-view.component';
import { Product } from '../../models';

export const ItemPage = () => {
  const onCreateItem = (item: Product) => {}
  return (
    <View style={{flex: 1}}>
      <ItemView onCreateItem={onCreateItem}/>
    </View>
  );
};
