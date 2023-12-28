import React from 'react';
import {Text, Dimensions, View, TouchableOpacity, Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';
import AdminUsersScreen from './AdminUsersScreen';
import AdminProfileScreen from './AdminProfileScreen';

const Tab = createBottomTabNavigator();

function AdminScreen() {
  const {onLogout, userAuth} = useAuth();
  return (
    <Tab.Navigator
      initialRouteName="AdminsHomeScreen"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          paddingTop: 5,
        },
        header: props => {
          return (
            <View
              style={{
                backgroundColor: 'white',
                height: props.layout.height * 0.065,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      source={require('../../../assets/school.webp')}></Image>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 23,
                        color: 'gray',
                        fontWeight: '900',
                      }}>
                      APP
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View>
                  <Text>{userAuth?.role}</Text>
                </View>
                <TouchableOpacity>
                  <Text>
                    <Icon name="theme-light-dark" size={30} color="gray" />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onLogout}>
                  <Text>
                    <Icon name="logout" size={30} color="gray" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        },
        tabBarBadge: '',
      }}>
      <Tab.Screen
        name="AdminsChildrenScreen"
        component={AdminUsersScreen}
        options={{
          tabBarIcon: props => (
            <Icon
              name="human-male"
              size={30}
              color={props.focused ? 'blue' : 'gray'}
            />
          ),
          tabBarLabel: 'Usuarios',
        }}
      />
      <Tab.Screen
        name="AdminsHomeScreen"
        component={AdminsHomeScreen}
        options={{
          tabBarIcon: props => (
            <Icon
              name="home"
              size={30}
              color={props.focused ? 'blue' : 'gray'}
            />
          ),
          tabBarLabel: 'Inicio',
          tabBarBadge: undefined,
        }}
      />
      <Tab.Screen
        name="AdminProfileScreen"
        component={AdminProfileScreen}
        options={{
          tabBarIcon: props => (
            <Icon
              name="account-settings"
              size={30}
              color={props.focused ? 'blue' : 'gray'}
            />
          ),
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

const response = axios.get('http://10.0.2.2:3001/');

function AdminsHomeScreen() {
  return (
    <View>
      <Text>AdminsHomeScreen</Text>
    </View>
  );
}

export default AdminScreen;
