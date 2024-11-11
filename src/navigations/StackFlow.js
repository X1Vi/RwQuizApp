// src/navigations/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ModifyQuiz from '../seller/ModifyQuiz';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EditableQuiz" component={ModifyQuiz} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
