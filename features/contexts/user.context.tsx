import {createContext} from 'react';
import {User, UserAuth} from '../models';
import { useState } from 'react';

type UserContext =  {
  userData: UserAuth;
  onCreate: (user: User) => void;
  onSignin: (authData: Partial<User>) => void,
  isSignedUp: boolean;
  isSignedIn: boolean;
};

export const userContext = createContext<UserContext>({
  userData: {accessToken: '', user: undefined},
  onCreate: (user: User) => {},
  onSignin: (authData: Partial<User>) => {},
  isSignedUp: false,
  isSignedIn: false,
});

