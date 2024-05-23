import {View, Text, ScrollView} from 'react-native';
import {useState} from 'react';
import {User, UserAuth} from './features/models';
import {Signin} from './features/signin/signin.component';
import {Signup} from './features/signup/signup.component';
import {UsersServices} from './features/services/user.services';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {userContext} from './features/contexts/user.context';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const userServices = new UsersServices();

export const Market = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const onCreate = (user: User) => {
    userServices
      .createUser(user)
      .then(async response => {
        const data: UserAuth = await response.json();
        setUser(data.user);
        setIsSignedUp(true);
      })
      .catch(error => console.error('create request failed: ', error));
  };
  const onSignin = (authData: Partial<User>) => {
    userServices
      .signinUser(authData)
      .then(async response => {
        const data: UserAuth = await response.json();
        setUser(data.user);
        setIsSignedIn(true);
      })
      .catch(error => console.error('signin request failed: ', error));
  };
  return (
    <View style={{height: '100%'}}>
      <userContext.Provider
        value={{
          user: user,
          onCreate: user => onCreate(user),
          onSignin: authData => onSignin(authData),
          isSignedIn: isSignedIn,
          isSignedUp: isSignedUp,
        }}>
        <Stack.Navigator initialRouteName="Signin">
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </userContext.Provider>
    </View>
  );
};
