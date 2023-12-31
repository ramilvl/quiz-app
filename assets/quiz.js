let userInfo = {};

function saveUserInfo() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  userInfo = {
    firstName: firstName,
    lastName: lastName,
  };

  fetch('/saveUserInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from server:', data);
    })
    .catch((error) => {
      console.error('Error sending user information to the server:', error);
    });

  const responseData = {
    quizData: quizData,
  };

  document.getElementById('inputForm').style.display = 'none';
  document.getElementById('quizContainer').style.display = 'block';

  const userInfoElement = document.getElementById('userInfo');
  userInfoElement.textContent = `Welcome, ${userInfo.firstName} ${userInfo.lastName}!`;

  startQuiz(responseData.quizData);
}

const quizData = [
  {
    question: 'Which technological advancement has contributed to the increased practicality of electric vehicles?',
    options: ['Improved fuel injection systems', 'Enhanced brake technology', 'Advancements in battery technology', 'Upgraded tire materials'],
    answer: 'Advancements in battery technology',
  },
  {
    question: 'What role do electric vehicles play in combating climate change??',
    options: ['Increasing greenhouse gas emissions', 'Reducing air pollution', 'Enhancing deforestation', 'Intensifying ozone depletion'],
    answer: 'Reducing air pollution',
  },
  {
    question: 'What is a crucial aspect that influences the adoption of electric vehicles by consumers?',
    options: ['Availability of gas station infrastructure', 'Complexity of electric vehicle maintenance', 'Government incentives and rebates', 'Production of loud engine noises'],
    answer: 'Government incentives and rebates',
  },
  {
    question: 'How have advancements in battery technology affected electric vehicles?',
    options: ['Reduced the range and charging capabilities', 'Increased the weight and decreased acceleration', 'Improved the range and charging capabilities', ' Hindered the performance and safety features'],
    answer: 'Improved the range and charging capabilities',
  },
];

let currentQuestion = 0;
let score = 0;

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

function showQuizResult() {
  const resultElement = document.getElementById('result');
  resultElement.textContent = `Hi ${userInfo.firstName} ${userInfo.lastName}, Your Quiz Result: ${score}/${quizData.length}`;

  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('quizResult').style.display = 'block';
}

document.getElementById('submitAnswerBtn').addEventListener('click', submitAnswer);

showQuestion();
