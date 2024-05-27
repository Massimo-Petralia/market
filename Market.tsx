import {Text, View} from 'react-native';
import {ItemPage} from './features/item/item-page/item-page.component';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {UserPage} from './features/user/user-page/user-page.component';

const Tab = createBottomTabNavigator();

export const Market = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string='';
          if (route.name === 'User') {
            iconName =  'person'
              ;
          }else if (route.name === 'add product') {
            iconName = 'add';
          }
          return <MaterialIcon name={iconName} size={size} color={color} />
        },
      })}>
      <Tab.Screen name="User" component={UserPage} />
      <Tab.Screen name="add product" component={ItemPage} />
    </Tab.Navigator>
  );
};
