import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

import ParentsChildrenScreen from './ParentsChildrenScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ParentsProfileScreen from './ParentsProfileScreen';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';
import {useEffect} from 'react';
import {fetchPermits} from '../../api/permit';
import PermitCard from '../../components/Permit';
import {ScrollView} from 'react-native';
import {RefreshControl} from 'react-native';

const Tab = createBottomTabNavigator();

function ParentScreen() {
  const {onLogout} = useAuth();
  return (
    <Tab.Navigator
      initialRouteName="ParentsHomeScreen"
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
              <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
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
        name="ParentsChildrenScreen"
        component={ParentsChildrenScreen}
        options={{
          tabBarIcon: props => (
            <Icon
              name="book-search"
              size={30}
              color={props.focused ? 'blue' : 'gray'}
            />
          ),
          tabBarLabel: 'Notas',
        }}
      />
      <Tab.Screen
        name="ParentsHomeScreen"
        component={ParentsHomeScreen}
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
        name="ParentsProfileScreen"
        component={ParentsProfileScreen}
        options={{
          tabBarIcon: props => (
            <Icon
              name="calendar-outline"
              size={30}
              color={props.focused ? 'blue' : 'gray'}
            />
          ),
          tabBarLabel: 'Permisos',
        }}
      />
    </Tab.Navigator>
  );
}

const response = axios.get('http://10.0.2.2:3001/');

function ParentsHomeScreen() {
  const {authState} = useAuth();
  const [permits, setPermits] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fPermits = async () => {
    const permitsResponse = await fetchPermits(authState?.token!);
    setPermits(permitsResponse);
  };
  useEffect(() => {
    fPermits();
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fPermits} />
      }>
      <View>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginTop: 15,
          }}>
          Permisos
        </Text>
        <View>
          {permits?.map((permit: any) => {
            return <PermitCard key={permit._id} permit={permit} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
}

export default ParentScreen;
