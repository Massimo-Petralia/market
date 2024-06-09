import {Text, View} from 'react-native';
import {ProductPage} from './features/product/product-page/product-page.component';
import {ProductListPage} from './features/product-list/product-list-page/product-list-page.component';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {productContext} from './features/context/market.context';

import {UserPage} from './features/user/user-page/user-page.component';
import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';
          if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Add product') {
            iconName = focused ? 'add-circle' : 'add';
          } else if (route.name === 'Home') {
            iconName = 'home';
          }
          return <MaterialIcon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={ProductListPage} />
      <Tab.Screen name="User" component={UserPage} />
      <Tab.Screen
        name="Add product"
        component={ProductPage}
        initialParams={{id: null}}
      />
    </Tab.Navigator>
  );
};

export const Market = () => {
  const context = useContext(productContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen
          name="Root"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Product" component={ProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
