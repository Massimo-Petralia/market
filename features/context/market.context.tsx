import {createContext} from 'react';
import {User, UserAuth} from '../models/market-models';
import {Product} from '../models/market-models';

type UserContext = {
  userData: UserAuth;
  onCreate: (user: User) => void;
  onSignin: (authData: Partial<User>) => void;
  isSignedUp: boolean;
  isSignedIn: boolean;
};

type ProductContext = {
  products: Product[];
};

export const userContext = createContext<UserContext>({
  userData: {accessToken: '', user: undefined},
  onCreate: (user: User) => {},
  onSignin: (authData: Partial<User>) => {},
  isSignedUp: false,
  isSignedIn: false,
});

export const productContext = createContext<ProductContext>({
  products: [],
});
