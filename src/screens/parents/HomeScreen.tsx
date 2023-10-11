import React from 'react';
import {Text, Dimensions, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../../context/AuthContext';

const windowHeight = Dimensions.get('window').height;

function HomeScreen() {
  const {onLogout} = useAuth();
  return (
    <SafeAreaView
      style={{
        height: windowHeight,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <View>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 30,
            textAlign: 'center',
            color: 'black',
            fontWeight: '700',
          }}>
          EMSApp
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            textAlign: 'center',
            color: 'black',
            fontWeight: '500',
          }}>
          Datos de estudiantes
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={onLogout}
          style={{
            padding: 20,
            backgroundColor: 'blue',
            marginVertical: 10,
            borderRadius: 15,
            marginHorizontal: 15,
            shadowColor: 'red',
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.3,
            shadowRadius: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
              color: 'white',
            }}>
            Salir
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
