import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Products: undefined;
  Product: {id: number | undefined};
};

export type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>;
