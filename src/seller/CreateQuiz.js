import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import DefaultButton from '../components/Buttons/DefaultButton';
import { useNavigation } from '@react-navigation/native';
import { createQuiz } from '../api/SelectQuizApi';
import { Alert } from 'react-native';

const CreateQuizScreen = () => {
    const navigation = useNavigation();

    // State for quiz title and description
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleSaveQuiz = async () => {
        try {

            if(quizTitle.length <= 2 || quizDescription.length <= 2){
                Alert.alert('One of the fields is empty !')
                return;
            }

            const quizCreated = await createQuiz(quizTitle, quizDescription, questions);
            console.log(quizCreated);
            
            // After saving, navigate back or proceed to another screen if needed
            navigation.goBack();
        } catch (err) {
            Alert.alert('Something Went Wrong')
        }

    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#FCFCFC' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Create New Quiz</Text>

            <Text style={{ fontSize: 18, marginBottom: 10 }}>Quiz Title</Text>
            <TextInput
                value={quizTitle}
                onChangeText={setQuizTitle}
                style={{
                    height: 40,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 20
                }}
                placeholder="Enter quiz title"
            />

            <Text style={{ fontSize: 18, marginBottom: 10 }}>Quiz Description</Text>
            <TextInput
                value={quizDescription}
                onChangeText={setQuizDescription}
                style={{
                    height: 100,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    textAlignVertical: 'top',
                }}
                placeholder="Enter quiz description"
                multiline
            />

            <View style={{ width:'100%', justifyContent:'flex-end', alignContent:'center', alignItems:'center', flex: 1,  }}>
                <DefaultButton buttonText="Save Quiz" onPressButton={handleSaveQuiz} />
            </View>
        </View>
    );
};

export default CreateQuizScreen;
