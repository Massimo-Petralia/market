import {Text, View} from 'react-native';
import {ItemPage} from './features/item/item-page/item-page.component';

import {UserPage} from './features/user/user-page/user-page.component';

export const Market = () => {
  return (
    <View style={{flex: 1}}>
      {/* <UserPage /> */}

      <ItemPage />
    </View>
  );
};
