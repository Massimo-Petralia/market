import {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Input} from '@rneui/themed';
import {User} from '../../models/market-models';
import {style} from '../../shared-style/style';
import {UserContext} from '../../context/market.context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../models/navigation-types';

export const SignupView = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Signup'>) => {
  const contextData = useContext(UserContext);
  const formData: User = {
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
            android_ripple={{color: 'lightsalmon'}}
            onPress={() => onSubmit(formData)}>
            <Text style={style.lightText}>SIGNUP</Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{margin: 10}}>If you have already signed up</Text>
          <Pressable onPress={() => navigation.navigate('Signin')}>
            <Text style={style.bluePalette}>Go to Signin</Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center'}}>
          {contextData.userData.user && contextData.isSignedUp ? (
            <Text style={style.greenPalette}>
              Wellcome{' '}
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
