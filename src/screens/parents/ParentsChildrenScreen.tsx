import {View, Text} from 'react-native';
import React from 'react';
import ChildrenList from '../../components/paretns/ChildrenList';
import {ScrollView} from 'react-native';

const ParentsChildrenScreen = () => {
  return (
    <ScrollView>
      <ChildrenList />
    </ScrollView>
  );
};

export default ParentsChildrenScreen;
