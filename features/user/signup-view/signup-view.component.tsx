import { useContext } from 'react';
import {View, Text, Pressable} from 'react-native';
import {Input} from '@rneui/themed';
import {User} from '../../models';
import {style} from '../../shared-style/style';
import { userContext } from '../../contexts/user.context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../user-page/user-page.component';

export const SignupView = ({navigation}:  NativeStackScreenProps<RootStackParamList, 'Signup'>) => {
  const contextData = useContext(userContext)
  const formData: User | undefined = {
    name: '',
    email: '',
    password: '',
  };
  const onSubmit = (user: User) => {
    contextData.onCreate(user);
  };
  return (
    <View style={style.viewContainer}>
      <View>
        <Input label="Name" onChangeText={name => (formData.name = name)} />
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
            <Text style={style.lightText}>SIGNUP</Text>
          </Pressable>
          <Text style={{margin: 10}}>If you have already signed up</Text>
          <Pressable
          onPress={()=> navigation.navigate('Signin')}
          >
            <Text style={style.bluePalette}>Go to Signin</Text>
          </Pressable>
          {contextData.user && contextData.isSignedUp ? (
            <Text style={style.notifications}>
              Wellcome{' '}
              {contextData.user.name.charAt(0).toLocaleUpperCase() + contextData.user.name.slice(1)} !
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};