import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Products: undefined;
  Product: {id: number | null};
};

export type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>;
