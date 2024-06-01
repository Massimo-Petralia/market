import {User} from '../models';
const usersURL = 'http://192.168.1.102:3000/users';
const signinURL = 'http://192.168.1.102:3000/signin';

export class UsersServices {
  createUser = (user: User) => {
    return fetch(usersURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };

  signinUser = (authData: Partial<User>) => {
    return fetch(signinURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });
  };
}
