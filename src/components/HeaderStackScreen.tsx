import {View, Text} from 'react-native';
import React from 'react';

interface Props {
  title: string;
}
export default function HeaderStackScreen({title}:Props) {
  return (
    <View
      style={{
        marginBottom: -100,
        backgroundColor: 'white',
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          textAlign: 'center',
          color: 'black',
        }}>
        {title}
      </Text>
    </View>
  );
}
