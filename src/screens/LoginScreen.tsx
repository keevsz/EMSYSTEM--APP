import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {ICredentials} from '../types/credentials';
import {useAuth} from '../context/AuthContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowHeight = Dimensions.get('window').height;
const INITIAL_STATE_CREDENTIALS = {
  username: 'keevsz',
  password: 'password',
};
const LoginScreen = () => {
  const [credentials, setCredentials] = useState<ICredentials>(
    INITIAL_STATE_CREDENTIALS,
  );

  const [error, setError] = useState('');
  const [stylesError, setStylesError] = useState({
    username: false,
    password: false,
  });

  const {onLogin, loading} = useAuth();
  const handleLogin = async () => {
    setError('');
    if (!credentials.password.length || !credentials.username.length) {
      setError('Ingresa todos los credenciales');

      let obj = {username: false, password: false};
      if (!credentials.username.length) {
        obj.username = true;
      }
      if (!credentials.password.length) {
        obj.password = true;
      }
      setStylesError(obj);
      return;
    }
    const result = await onLogin!(credentials);
    if (result && result.error) {
      setError(result.msg.data.message);
      setTimeout(() => {
        setError('');
      }, 2600);
    }
  };

  useEffect(() => {
    let obj = {username: false, password: false};
    if (credentials.username.length) {
      obj.username = false;
    }
    if (credentials.password.length) {
      obj.password = false;
    }
    setStylesError(obj);
    setTimeout(() => {
      setError('');
    }, 1000);
  }, [credentials]);
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              height: windowHeight,
              justifyContent: 'center',
              paddingHorizontal: 30,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginVertical: 15,
                  color: 'black',
                }}>
                IEP
              </Text>
              <Image source={require('../../assets/school.webp')}></Image>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginVertical: 15,
                  color: 'black',
                }}>
                Rayitos del sol
              </Text>
            </View>
            <View>
              <TextInput
                placeholder="Nombre de usuario"
                placeholderTextColor={stylesError.password ? 'red' : 'black'}
                style={{
                  ...styles.input,
                  borderColor: stylesError.username ? 'red' : 'black',
                }}
                value={credentials.username}
                onChangeText={username => {
                  setCredentials({...credentials, username});
                }}
              />
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={stylesError.password ? 'red' : 'black'}
                secureTextEntry
                style={{
                  ...styles.input,
                  borderColor: stylesError.password ? 'red' : 'black',
                }}
                value={credentials.password}
                onChangeText={password => {
                  setCredentials({...credentials, password});
                }}
              />
            </View>
            <View>
              <TouchableOpacity
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
                }}
                onPress={handleLogin}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '700',
                    color: 'white',
                  }}>
                  Ingresar
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 150,
              }}>
              {error && (
                <Text
                  style={{textAlign: 'center', color: '#ff0000', fontSize: 16}}>
                  {error}
                </Text>
              )}
            </View>
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 80,
              }}>
              {loading && <ActivityIndicator size={'large'} color={'blue'} />}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    color: 'black',
    marginVertical: 20,
    marginHorizontal: 15,
    borderStyle: 'solid',
    borderBottomWidth: 1.5,
    borderBottomColor: 'black',
  },
});

export default LoginScreen;
