import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import QuizQuestionCustomerMCQ from './QuizQuestionCustomer';
import DefaultButton from '../../components/Buttons/DefaultButton';
import { checkAnswers } from '../../api/SelectQuizApi';
import { useNavigation } from '@react-navigation/native';

const QuizCustomer = ({ isEditableProp = false, route }) => {
  const navigation = useNavigation();
  const { quizData } = route.params;

  useEffect(() => {
    console.log("QuizDataInEditable");
    console.log(quizData);
    setQuizId(quizData?.id)
  }, [quizData]);

  useEffect(()=>{
    console.log("quiz-id");
    console.log(quizId);
    
  },[quizId, setQuizId])

  const questions = quizData?.questions;

  const [editableQuestionsAndAnswers, setEditableQuestionsAndAnswers] = useState(questions);
  const [isEditable, setIsEditable] = useState(isEditableProp);
  const [copyQuestionsAndAnswers, setCopyQuestionsAndAnswers] = useState(questions);
  const [answers, setAnswers] = useState([]);
  const [quizId, setQuizId] = useState(null);

 


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

      {(editableQuestionsAndAnswers.length === 0) ? (
        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
          <DefaultButton buttonText='Add New Question' onPressButton={addNewQuestion} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {editableQuestionsAndAnswers.map((item, index) => (
            <QuizQuestionCustomerMCQ
              answersState={answers}
              setAnswers={setAnswers}
              key={index}
              question={item.question}
              answers={item.answers}
              editableQuestionsAndAnswers={editableQuestionsAndAnswers}
              setEditableQuestionsAndAnswers={setEditableQuestionsAndAnswers}
              itemIndex={index}
              isEditable={isEditable}
            />
          ))}

          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {(isEditable) ? (
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
            ) : null}
          </View>
        </ScrollView>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: isEditable ? "50%" : "90%",
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <DefaultButton buttonText='Submit' heightIncrease={60} onPressButton={async () => {
            try{
              const { correctAnswers, totalQuestions } = await checkAnswers(quizId, answers);
              Alert.alert(`${correctAnswers}/${totalQuestions} correct answers` )
              navigation.navigate('SelectQuiz')
            }
            catch(err){
              Alert.alert("Something Went Wrong")
            }
          }} />
        </View>

        {isEditable ? (
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <DefaultButton onPressButton={() => {
              setEditableQuestionsAndAnswers(copyQuestionsAndAnswers);
            }} buttonText='Revert' heightIncrease={60} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default QuizCustomer;
