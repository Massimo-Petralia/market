import {createContext} from 'react';
import {User} from '../models';

type UserContext = {
  user: User | undefined;
  onCreate: (user: User) => void;
  onSignin: (authData: Partial<User>) => void,
  isSignedUp: boolean;
  isSignedIn: boolean;
};

export const userContext = createContext<UserContext>({
  user: undefined,
  onCreate: (user: User) => {},
  onSignin: (authData: Partial<User>) => {},
  isSignedUp: false,
  isSignedIn: false,
});
