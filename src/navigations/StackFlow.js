import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ModifyQuiz from '../seller/ModifyQuiz';
import QuizSelector from '../seller/SelectQuiz';
import QuizCustomer from '../customer/QuizCustomer/QuizCustomer';
import CreateQuiz from '../seller/CreateQuiz';

const Stack = createStackNavigator();

const StackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SelectQuiz'
        children={(props) => <QuizSelector {...props} navigateToModifyQuiz={false} />}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="EditableQuiz"
        children={(props) => <ModifyQuiz {...props} isEditableProp={true} />}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name='Quiz'
        children={(props) => <QuizCustomer {...props} isEditableProp={false} />}
        options={{headerShown:false}}
      />

      <Stack.Screen
        name='CreateQuiz'
        children={(props) => <CreateQuiz />}
        options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
