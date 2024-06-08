import React from 'react';
import {View} from 'react-native';
import {Market} from './Market';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      
        <Market />
     
    </View>
  );
}

export default App;
