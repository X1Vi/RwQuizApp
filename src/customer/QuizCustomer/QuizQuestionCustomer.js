import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const QuizQuestionCustomerMCQ = ({ question, answers }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track selected answer

    return (
        <View style={{ flex: 1, backgroundColor: "#FCFCFC", padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: '400', color: 'black', marginBottom: 20 }}>
                {question}
            </Text>

            {answers.map((answer, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedAnswer(index)}
                    style={{
                        padding: 15,
                        borderRadius: 8,
                        backgroundColor: selectedAnswer === index ? '#C43939' : '#FCFCFC',
                        marginBottom: 10,
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
            ))}
        </View>
    );
};

export default QuizQuestionCustomerMCQ;
