// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import from react-native-vector-icons
import QuizCustomer from '../customer/QuizCustomer/QuizCustomer';
import Quiz from '../customer/Quiz';
import ModifyQuiz from '../seller/ModifyQuiz';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="NonEditableQuiz"
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
      <Tab.Screen
        name="NonEditableQuiz"
        component={Quiz}
        initialParams={{ isEditableProp: false }}
        options={{ title: 'View Quiz' }}
      />
      <Tab.Screen
        name="EditableQuiz"
        component={ModifyQuiz}
        initialParams={{ isEditableProp: true }}
        options={{ title: 'Edit Quiz' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
