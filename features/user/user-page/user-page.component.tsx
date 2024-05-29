import {useState, useContext} from 'react';
import {User, UserAuth} from '../../models';
import {UsersServices} from '../../services/user.services';
import {ScrollViewComponent, View} from 'react-native';
import {userContext} from '../../contexts/user.context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SigninView} from '../signin-view/signin-view.component';
import {SignupView} from '../signup-view/signup-view.component';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const userServices = new UsersServices();

export const UserPage = () => {
  const [user, setUser] = useState<UserAuth|undefined>(undefined);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const contextUserData = useContext(userContext)

  const onCreate = (user: User) => {
    userServices
      .createUser(user)
      .then(async response => {
        const data: UserAuth = await response.json();
        setUser(data);
        setIsSignedUp(true);
      })
      .catch(error => console.error('create request failed: ', error));
    };
    const onSignin = (authData: Partial<User>) => {
      userServices
      .signinUser(authData)
      .then(async response => {
        const data: UserAuth = await response.json();
        setUser(data);
        setIsSignedIn(true);
        contextUserData.userData = data
      })
      .catch(error => console.error('signin request failed: ', error));
  };
  return (
    <View style={{flex: 1}}>
      <userContext.Provider
        value={{
          userData: user,
          onCreate: user => onCreate(user),
          onSignin: authData => onSignin(authData),
          isSignedIn: isSignedIn,
          isSignedUp: isSignedUp,
        }}>
        <Stack.Navigator initialRouteName="Signin">
          <Stack.Screen name="Signin" component={SigninView} />
          <Stack.Screen name="Signup" component={SignupView} />
        </Stack.Navigator>
      </userContext.Provider>
    </View>
  );
};
