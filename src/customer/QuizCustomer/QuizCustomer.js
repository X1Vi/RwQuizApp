import { View, Text, ScrollView} from 'react-native';
import React from 'react';
import QuizQuestionCustomerMCQ from './QuizQuestionCustomer';
const QuizCustomer = () => {
  // Array of dummy questions with answers
  const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Rome", "Berlin"]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Saturn"]
    },
    {
      question: "What is the largest mammal?",
      answers: ["Elephant", "Blue Whale", "Giraffe", "Tiger"]
    },
    {
      question: "How many continents are there?",
      answers: ["5", "6", "7", "8"]
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#FCFCFC", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Questions 
      </Text>

      <ScrollView>
        {questions.map((item, index) => (
          <QuizQuestionCustomerMCQ
            key={index}
            question={item.question}
            answers={item.answers}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default QuizCustomer;
