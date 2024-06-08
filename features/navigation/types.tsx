import {RouteProp} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
  Products: undefined;
  Product: {id: number | null};
};

export type ProductsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Products'>

export type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>;
//export type ProductsRouteProp = RouteProp<RootStackParamList, 'Products'>
