import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import TabNavigator from './src/navigations/BottomNavFlow';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />  
    </NavigationContainer>
  );
};

export default App;
