import {View, Text, Pressable} from 'react-native';
import {Input} from '@rneui/themed';
import {User} from '../../models/market-models';
import {style} from '../../shared-style/style';
import {UserContext} from '../../context/market.context';
import {useContext} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../models/navigation-types';
export const SigninView = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Signin'>) => {
  const contextData = useContext(UserContext);
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
            android_ripple={{color: 'lightsalmon'}}
            onPress={() => onSubmit(formData)}>
            <Text style={style.lightText}>SIGNIN</Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{margin: 10}}>If you are new</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={style.bluePalette}>Go to Signup</Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center'}}>
          {contextData.userData.user && contextData.isSignedIn ? (
            <Text style={style.greenPalette}>
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
