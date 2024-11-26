import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { fetchQuizzes } from '../api/SelectQuizApi';
import { ScrollView } from 'react-native';
const QuizSelector = ({ navigateToModifyQuiz = true }) => {
  const navigation = useNavigation();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    fetchQuizzes(page, setQuizzes, setHasMore, setLoading);
  }, [page]);

  const loadMoreQuizzes = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#FCFCFC', padding: 20, borderRadius: 8, flex: 1 }}>
      {quizzes.map((quiz) => (
        <TouchableOpacity
          key={quiz.id}
          onPress={() => {
            if (navigateToModifyQuiz === true) {
              navigation.navigate('EditableQuiz', {
                quizData: quiz,
              });
            }
            else {
              navigation.navigate('Quiz', {
                quizData: quiz
              })
            }
          }}
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 12,
            padding: 15,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}
        >
          <Text style={{ color: '#C43939', fontSize: 16, fontWeight: 'bold' }}>
            ID: {quiz?.id}
          </Text>
          <Text style={{ color: '#C43939', fontSize: 14, marginTop: 5 }}>
            Title: {quiz?.title}
          </Text>
        </TouchableOpacity>
      ))}

      {loading ? (
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <ActivityIndicator size="large" color="#C43939" />
          <Text style={{ color: '#C43939', fontSize: 16, marginTop: 10 }}>
            Loading quizzes...
          </Text>
        </View>
      ) : null}

      {!loading && !hasMore ? (
        <Text
          style={{
            color: '#C43939',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          No more quizzes to load.
        </Text>
      ) : null}

      {!loading && hasMore ? (
        <TouchableOpacity
          onPress={loadMoreQuizzes}
          style={{
            backgroundColor: '#C43939',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignSelf: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ color: '#FCFCFC', fontSize: 16, textAlign: 'center' }}>
            Load More
          </Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('CreateQuiz')
        }}
        style={{
          backgroundColor: '#C43939',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          alignSelf: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#FCFCFC', fontSize: 16, textAlign: 'center' }}>
          Create Quiz
        </Text>
      </TouchableOpacity>
      <View style={{height:100}}>

      </View>
    </ScrollView>
  );
};

export default QuizSelector;
