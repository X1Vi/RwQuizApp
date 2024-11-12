import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ModifyQuiz from '../seller/ModifyQuiz';
import QuizSelector from '../seller/SelectQuiz';
import QuizCustomer from '../customer/QuizCustomer/QuizCustomer';

const Stack = createStackNavigator();

const StackNavigator = () => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='SelectQuiz' 
        children={(props) => <QuizSelector {...props} navigateToModifyQuiz={false} />} 
      />
      <Stack.Screen 
        name="EditableQuiz" 
        children={(props) => <ModifyQuiz {...props} isEditableProp={true} />} 
      />
      <Stack.Screen 
        name='Quiz' 
        children={(props) => <QuizCustomer {...props} isEditableProp={false} />} 
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
