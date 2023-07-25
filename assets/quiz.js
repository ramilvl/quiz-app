// Variable to store user information
let userInfo = {};

// Function to save user information and get quiz questions
function saveUserInfo() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  userInfo = {
    firstName: firstName,
    lastName: lastName,
  };

  // Assuming you'll fetch data from the server here instead of directly using quizData
  // Replace the following line with the actual fetch to your server
  // For now, we'll just use the provided quizData array for testing
  const responseData = {
    quizData: quizData,
  };

  // After saving user information, show the quiz questions
  document.getElementById('inputForm').style.display = 'none';
  document.getElementById('quizContainer').style.display = 'block';

  // Display the user information on the page
  const userInfoElement = document.getElementById('userInfo');
  userInfoElement.textContent = `Welcome, ${userInfo.firstName} ${userInfo.lastName}!`;

  startQuiz(responseData.quizData);
}

// Sample Quiz Questions and Answers
const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Mars'],
    answer: 'Mercury',
  },
  {
    question: 'What is the Arabic word for "Peace"?',
    options: ['Salam', 'Shukran', 'Marhaba'],
    answer: 'Salam',
  },
  // Add more questions and answers as needed
  // Make sure each question has different variants and the correct answer is one of the options
];

let currentQuestion = 0;
let score = 0;

// Function to show the quiz question
function showQuestion() {
  if (currentQuestion < quizData.length) {
    const questionElement = document.getElementById('question');
    const options = document.getElementsByName('answer');

    questionElement.textContent = quizData[currentQuestion].question;

    for (let i = 0; i < options.length; i++) {
      options[i].checked = false;
      options[i].value = quizData[currentQuestion].options[i];
      options[i].nextElementSibling.textContent = quizData[currentQuestion].options[i];
    }

    document.getElementById('quizResult').style.display = 'none';
  } else {
    showQuizResult();
  }
}

// Function to submit the quiz answer
function submitAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');

  if (selectedOption) {
    if (selectedOption.value === quizData[currentQuestion].answer) {
      score++;
    }

    currentQuestion++;
    showQuestion();
  }
}

// Function to show the quiz result
function showQuizResult() {
  const resultElement = document.getElementById('result');
  resultElement.textContent = `Hi ${userInfo.firstName} ${userInfo.lastName}, Your Quiz Result: ${score}/${quizData.length}`;

  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('quizResult').style.display = 'block';
}

// Attach the submitAnswer() function to the "Submit Answer" button
document.getElementById('submitAnswerBtn').addEventListener('click', submitAnswer);

// Initialize the quiz
showQuestion();
