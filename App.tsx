import React from 'react';
import {View} from 'react-native';
import {Market} from './Market';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <View>
      <NavigationContainer>
        <Market />
      </NavigationContainer>
    </View>
  );
}

export default App;
