import React, {useState} from 'react';
import {useColorScheme, TouchableOpacity, Text, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import {AuthProvider, useAuth} from './src/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/parents/HomeScreen';
import HeaderStackScreen from './src/components/HeaderStackScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const {authState, onLogout, loading} = useAuth();
  const [splashStatus, setSplashStatus] = useState(true);
  setTimeout(() => {
    if (!loading) {
      setSplashStatus(false);
    }
  }, 2100);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashStatus ? (
          <Stack.Screen
            options={{
              header: () => {
                return <></>;
              },
            }}
            name="Splash"
            component={SplashScreen}
          />
        ) : authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => {
                return <></>;
              },
            }}
          />
        ) : (
          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
              header: () => {
                return <HeaderStackScreen title="Login" />;
              },
            }}
            name="Login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
