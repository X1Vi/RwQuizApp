import axios from "axios";

export const fetchQuizzes = async (pageNumber = 1, setQuizzes, setHasMore, setLoading) => {
    setLoading(true);
    try {
        const response = await axios.get(
            'http://10.0.2.2:8000/api/quizzes/',
            {
                params: {
                    page: pageNumber,
                    page_size: 2,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = response.data;
        console.log(data);  // Check data structure in response

        setQuizzes((prevQuizzes) => [...prevQuizzes, ...data.results]);
        setHasMore(data.next); // Update whether more quizzes are available
    } catch (error) {
        console.error('Error fetching quizzes:', error);
    } finally {
        setLoading(false);
    }
};

export const updateQuiz = async (editableQuestionsAndAnswers, quizData) => {
    try {
        const quizUpdateData = {
            id: quizData?.id, // Use the quizData id
            title: quizData?.title, // Use the quizData title
            description: quizData?.description, // Use the quizData description
            questions: editableQuestionsAndAnswers, // Updated questions
        };

        const response = await axios.patch('http://10.0.2.2:8000/api/quizzes/', quizUpdateData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Quiz updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating quiz:', error.response ? error.response.data : error.message);
    }
};


export async function checkAnswers(quizId, answers) {
    const url = `http://10.0.2.2:8000/quiz/${quizId}/check_answers/`;

    const requestBody = {
        answers: answers,
    };

    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Assuming response.data contains the results
        const results = response.data.results;
        const totalQuestions = results.length;
        const correctAnswers = results.filter(result => result.is_correct).length;

        console.log(`Correct answers: ${correctAnswers} out of ${totalQuestions}`);
        return { correctAnswers, totalQuestions };

    } catch (error) {
        console.error('Error checking answers:', error);
        throw error;
    }
}
// Example usage:
const answers = {
    "What is the capital of Japan?": "Tokyo",
    "Which element has the chemical symbol 'O'?": "Oxygen",
    "What is the largest planet in our Solar System?": "Jupiter",
    "Which country is known as the Land of the Rising Sun?": "Japan"
};