import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DefaultButton from '../../components/Buttons/DefaultButton';

const LoginCustomer = () => {
    const [isPhone, setIsPhone] = useState(true); // State to toggle between phone and email
    const [inputValue, setInputValue] = useState(''); // State to store input

    return (
        <View style={{ flex: 1, backgroundColor: "#FCFCFC", padding: 20, alignContent:'center', alignItems:'center'}}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Login</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => setIsPhone(true)}>
                    <Text style={{
                        fontSize: 16,
                        padding: 10,
                        color: isPhone ? '#C43939' : '#888',
                        fontWeight: isPhone ? 'bold' : 'normal'
                    }}>
                        Phone Number
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsPhone(false)}>
                    <Text style={{
                        fontSize: 16,
                        padding: 10,
                        color: !isPhone ? '#C43939' : '#888',
                        fontWeight: !isPhone ? 'bold' : 'normal'
                    }}>
                        Email
                    </Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={{
                    height: 50,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    marginBottom: 20,
                    width:"80%"
                }}
                placeholder={isPhone ? "Enter your phone number" : "Enter your email"}
                keyboardType={isPhone ? "phone-pad" : "email-address"}
                value={inputValue}
                onChangeText={setInputValue}
            />

            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,  // Add some spacing from the input field
                position:'absolute',
                bottom:20,
                width:"100%",
                flex:1
            }}>
                <DefaultButton buttonText={"Sign In"} />
            </View>
        </View>
    );
};

export default LoginCustomer;
