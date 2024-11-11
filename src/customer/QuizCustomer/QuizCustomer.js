import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import QuizQuestionCustomerMCQ from './QuizQuestionCustomer';
import DefaultButton from '../../components/Buttons/DefaultButton';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

const QuizCustomer = ({ isEditableProp = false }) => {
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

  const [editableQuestionsAndAnswers, setEditableQuestionsAndAnswers] = useState(questions);
  const [isEditable, setIsEditable] = useState(isEditableProp);
  const [copyQuestionsAndAnswers, setCopyQuestionsAndAnswers] = useState(questions);

  // Function to add a new question
  const addNewQuestion = () => {
    const newQuestion = {
      question: "", // Default empty question
      answers: ["", "", "", ""] // Default empty answers
    };
    setEditableQuestionsAndAnswers([...editableQuestionsAndAnswers, newQuestion]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FCFCFC", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Questions
      </Text>
      {(editableQuestionsAndAnswers.length === 0) ?
        <View style={{ height: 150, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <DefaultButton buttonText='Add New Question' onPressButton={addNewQuestion} />
        </View> :
        <ScrollView>
          {editableQuestionsAndAnswers.map((item, index) => (
            <QuizQuestionCustomerMCQ
              key={index}
              question={item.question}
              answers={item.answers}
              editableQuestionsAndAnswers={editableQuestionsAndAnswers}
              setEditableQuestionsAndAnswers={setEditableQuestionsAndAnswers}
              itemIndex={index}
              isEditable={isEditable}
            />
          ))}

          <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            {(isEditable) ?
              <TouchableOpacity
                onPress={addNewQuestion} // Call the function to add a new question
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,  // Makes it circular
                  backgroundColor: '#FCFCFC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#C43939',
                  marginBottom: 50
                }}
              >
                <Text style={{ color: '#C43939', fontSize: 18, fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              : null}
          </View>
        </ScrollView>
      }
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: isEditable ? "50%" : "90%",
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}>
          <DefaultButton buttonText='Submit' heightIncrease={60} />
        </View>

        {isEditable ?
          <View style={{ width: '50%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <DefaultButton onPressButton={() => {
              setEditableQuestionsAndAnswers(copyQuestionsAndAnswers);
            }} buttonText='Revert' heightIncrease={60} />
          </View>
          : null}
      </View>
    </View>
  );
};

export default QuizCustomer;
