import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import {AuthProvider, useAuth} from './src/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import ParentScreen from './src/screens/parents/ParentScreen';
import SplashScreen from './src/screens/SplashScreen';
import AdminScreen from './src/screens/admin/AdminScreen';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const {authState, onLogout, loading, userAuth} = useAuth();
  const [splashStatus, setSplashStatus] = useState(true);

  setTimeout(() => {
    if (!loading) {
      setSplashStatus(false);
    }
  }, 2100);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {splashStatus ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : authState?.authenticated ? (
          userAuth?.role === 'admin' ? (
            <Stack.Screen name="AdminHome" component={AdminScreen} />
          ) : (
            <Stack.Screen name="UserHome" component={ParentScreen} />
          )
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
