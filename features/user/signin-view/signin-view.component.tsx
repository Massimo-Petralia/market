import {View, Text, Pressable} from 'react-native';
import {Input} from '@rneui/themed';
import {User} from '../../models';
import {style} from '../../shared-style/style';
import {userContext} from '../../contexts/user.context';
import {useContext} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../user-page/user-page.component';
export const SigninView = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Signin'>) => {
  const contextData = useContext(userContext);
  const formData: Partial<User> | undefined = {
    email: '',
    password: '',
  };
  const onSubmit = (authData: Partial<User>) => {
    contextData.onSignin(authData);
  };
  return (
    <View style={style.viewContainer}>
      <View>
        <Input
          label="E-mail"
          onChangeText={email => (formData.email = email)}
        />
        <Input
          label="Password"
          onChangeText={password => (formData.password = password)}
        />
        <View style={style.mainButtonContainer}>
          <Pressable
            style={style.pressable}
            android_ripple={{color: 'lightgreen'}}
            onPress={() => onSubmit(formData)}>
            <Text style={style.lightText}>SIGNIN</Text>
          </Pressable>
          <Text style={{margin: 10}}>If you are new</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={style.bluePalette}>Go to Signup</Text>
          </Pressable>
          {contextData.userData?.user && contextData.isSignedIn ? (
            <Text style={style.notifications}>
              Hello{' '}
              {contextData.userData.user.name.charAt(0).toLocaleUpperCase() +
                contextData.userData.user.name.slice(1)}{' '}
              !
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};
