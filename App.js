import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import TabNavigator from './src/navigations/BottomNavFlow';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />  {/* Wrap your TabNavigator inside NavigationContainer */}
    </NavigationContainer>
  );
};

export default App;
