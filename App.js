import { View, Text } from 'react-native'
import React from 'react'
import DefaultButton from './src/components/Buttons/DefaultButton'
import LoginCustomer from './src/customer/LoginCustomer/LoginCustomer'
import QuizCustomer from './src/customer/QuizCustomer/QuizCustomer'

const App = () => {
  return (
    <View style={{flex: 1}}>
      <QuizCustomer />
      {/* <LoginCustomer /> */}
    </View>
  )
}

export default App