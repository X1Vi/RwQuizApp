import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

const QuizQuestionCustomerMCQ = ({ itemIndex = null, question, answers, isEditable = false, editableQuestionsAndAnswers = [], setEditableQuestionsAndAnswers, answersState = null, setAnswers = null }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track selected answer

    useEffect(() => {
        if(answers === null && setAnswers == null)
        {
            return;
        }
        if (selectedAnswer !== null) {
            const updatedAnswers = { ...answersState };
            updatedAnswers[question] = answers[selectedAnswer];
            setAnswers(updatedAnswers);
        }

        console.log(answersState);
        
    }, [selectedAnswer]);

    // Function to handle answer change
    const handleAnswerChange = (text, index) => {
        if (Array.isArray(editableQuestionsAndAnswers)) {
            // Deep copy of the array to avoid directly modifying state
            let editableQuestionsAndAnswers_ = JSON.parse(JSON.stringify(editableQuestionsAndAnswers));
            let getCurrentItem = editableQuestionsAndAnswers_[itemIndex];

            if (getCurrentItem) {
                getCurrentItem.answers[index] = text;
                setEditableQuestionsAndAnswers(editableQuestionsAndAnswers_);
            }
        }
    };

    // Function to handle question change
    const handleQuestionChange = (text) => {
        if (Array.isArray(editableQuestionsAndAnswers)) {
            // Deep copy of the array to avoid directly modifying state
            let editableQuestionsAndAnswers_ = JSON.parse(JSON.stringify(editableQuestionsAndAnswers));
            let getCurrentItem = editableQuestionsAndAnswers_[itemIndex];

            if (getCurrentItem) {
                getCurrentItem.question = text;
                setEditableQuestionsAndAnswers(editableQuestionsAndAnswers_);
            }
        }
    };

    // Function to handle item deletion
    const handleDelete = () => {
        if (Array.isArray(editableQuestionsAndAnswers) && itemIndex !== null) {
            // Remove the item at itemIndex from the array
            const updatedQuestions = [
                ...editableQuestionsAndAnswers.slice(0, itemIndex),
                ...editableQuestionsAndAnswers.slice(itemIndex + 1),
            ];
            // Save the updated array
            setEditableQuestionsAndAnswers(updatedQuestions);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#FCFCFC", padding: 20 }}>
            {isEditable ? (
                <TouchableOpacity
                    onPress={handleDelete}
                    style={{
                        width: '100%',
                        alignItems: 'flex-end',
                        backgroundColor: '#FCFCFC',
                        padding: 10,
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: '#C43939', fontWeight: '600' }}>Delete</Text>
                </TouchableOpacity>
            ) : null}

            {/* Question Input */}
            {isEditable ? (
                <TextInput
                    value={question}
                    onChangeText={handleQuestionChange}
                    style={{
                        padding: 15,
                        borderRadius: 8,
                        backgroundColor: '#FCFCFC',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        fontSize: 16,
                        marginBottom: 20,
                    }}
                />
            ) : (
                <Text style={{ fontSize: 20, fontWeight: '400', color: 'black', marginBottom: 20 }}>
                    {question}
                </Text>
            )}

            {/* Answers */}
            {answers.map((answer, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    {isEditable ? (
                        <TextInput
                            value={answer}
                            onChangeText={(text) => handleAnswerChange(text, index)}
                            style={{
                                padding: 15,
                                borderRadius: 8,
                                backgroundColor: '#FCFCFC',
                                borderWidth: 1,
                                borderColor: '#ccc',
                                fontSize: 16
                            }}
                        />
                    ) : (
                        <TouchableOpacity
                            onPress={() => setSelectedAnswer(index)}
                            style={{
                                padding: 15,
                                borderRadius: 8,
                                backgroundColor: selectedAnswer === index ? '#C43939' : '#FCFCFC',
                                borderWidth: 1,
                                borderColor: selectedAnswer === index ? '#C43939' : '#ccc'
                            }}
                        >
                            <Text style={{
                                color: selectedAnswer === index ? '#FCFCFC' : 'rgba(0, 0, 0, 0.8)',
                                fontSize: 16
                            }}>
                                {answer}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
};

export default QuizQuestionCustomerMCQ;
