import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
  Products: undefined;
  Product: {id?: number | null};
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Product'
>;

export type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>;
