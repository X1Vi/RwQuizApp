import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import QuizQuestionCustomerMCQ from '../customer/QuizCustomer/QuizQuestionCustomer';
import DefaultButton from '../components/Buttons/DefaultButton';
import { updateQuiz } from '../api/SelectQuizApi';
import { useNavigation } from '@react-navigation/native';

const QuizCustomer = ({ isEditableProp = true, route }) => {
  const navigation = useNavigation();
  const { quizData } = route.params;

  useEffect(() => {
    console.log("QuizDataInEditable");
    console.log(quizData);
  }, [quizData]);

  const questions = quizData?.questions.map(q => ({
    ...q,
    correct_answer: q.correct_answer || null, // Initialize correct_answer if not present
  }));

  const [editableQuestionsAndAnswers, setEditableQuestionsAndAnswers] = useState(questions);
  const [isEditable, setIsEditable] = useState(isEditableProp);
  const [copyQuestionsAndAnswers, setCopyQuestionsAndAnswers] = useState(questions);

  const toggleDropdown = (index) => {
    setEditableQuestionsAndAnswers((prevQuestions) =>
      prevQuestions.map((item, i) => ({
        ...item,
        showDropdown: i === index ? !item.showDropdown : false // Toggle dropdown visibility for specific question
      }))
    );
  };

  const selectCorrectAnswer = (questionIndex, answer) => {
    setEditableQuestionsAndAnswers((prevQuestions) =>
      prevQuestions.map((item, index) => {
        if (index === questionIndex) {
          return { ...item, correct_answer: answer, showDropdown: false };
        }
        return item;
      })
    );
  };

  const addNewQuestion = () => {
    const newQuestion = {
      question: "",
      answers: ["", "", "", ""],
      correct_answer: null, // Initialize empty correct answer
      showDropdown: false
    };
    setEditableQuestionsAndAnswers([...editableQuestionsAndAnswers, newQuestion]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FCFCFC", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Questions
      </Text>

      {editableQuestionsAndAnswers.length === 0 ? (
        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
          <DefaultButton buttonText='Add New Question' onPressButton={addNewQuestion} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {editableQuestionsAndAnswers.map((item, index) => (
            <View key={index}>
              <QuizQuestionCustomerMCQ
                question={item.question}
                answers={item.answers}
                editableQuestionsAndAnswers={editableQuestionsAndAnswers}
                setEditableQuestionsAndAnswers={setEditableQuestionsAndAnswers}
                itemIndex={index}
                isEditable={isEditable}
              />
              <View style={{width:"100%", justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:2, }}>
                <Text>Select the Correct Answer:</Text>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 5,
                    marginVertical: 5,
                    backgroundColor: '#fff',
                    width:'90%'
                  }}
                  onPress={() => toggleDropdown(index)}
                >
                  <Text>{item.correct_answer || 'Select Answer'}</Text>
                </TouchableOpacity>

                {item.showDropdown ? (
                  <View style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 5,
                    marginTop: 5,
                    backgroundColor: '#f9f9f9',
                    elevation: 1
                  }}>
                    {item.answers.map((answer, answerIndex) => (
                      <TouchableOpacity
                        key={answerIndex}
                        onPress={() => selectCorrectAnswer(index, answer)}
                        style={{
                          padding: 10,
                          borderBottomWidth: answerIndex < item.answers.length - 1 ? 1 : 0,
                          borderBottomColor: '#ddd',
                          width:'100%'
                        }}
                      >
                        <Text>{answer}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}
              </View>
            </View>
          ))}

          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {isEditable ? (
              <TouchableOpacity
                onPress={addNewQuestion}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
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
          <DefaultButton buttonText='Submit' heightIncrease={60} onPressButton={() => {
            updateQuiz(editableQuestionsAndAnswers, quizData);
            navigation.navigate('SelectQuiz');
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
