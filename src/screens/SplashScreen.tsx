import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';

const windowsHeight = Dimensions.get('screen').height;
const SplashScreen = () => {
  return (
    <View
      style={{
        height: windowsHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../../assets/school.webp')}></Image>
      <Text style={{fontSize: 25, color: 'black', fontWeight: '500'}}>
        Rayitos de sol
      </Text>
      <Text style={{fontSize: 25, color: 'black', fontWeight: '500'}}>App</Text>
    </View>
  );
};

export default SplashScreen;
