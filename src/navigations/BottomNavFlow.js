// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import from react-native-vector-icons
import QuizCustomer from '../customer/QuizCustomer/QuizCustomer';
import Quiz from '../customer/QuizCustomer/Quiz';
import ModifyQuiz from '../seller/ModifyQuiz';
import SelectQuiz from '../seller/SelectQuiz';
import StackNavigator from './StackFlow';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="StackNavigator"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'NonEditableQuiz') {
            iconName = 'eye';
          } else if (route.name === 'EditableQuiz') {
            iconName = 'pencil';
          }
          return <Icon name={iconName} size={size} color={color} />; // Use Icon from react-native-vector-icons
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* <Tab.Screen
        name="NonEditableQuiz"
        component={StackNavigator}
        initialParams={{ isEditableProp: false }}
        options={{ title: 'View Quiz' }}
      /> */}
      <Tab.Screen
        name="StackNavigator"
        component={StackNavigator}
        initialParams={{ isEditableProp: true }}
        options={{ headerShown:false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
