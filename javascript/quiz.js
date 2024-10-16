let questions = [];

function fetchQuestions() {
  return fetch('https://it-project.yzz.me/get_questions.php')
    .then(response => response.json())
    .then(data => {
      questions = data;
    })
    .catch(error => console.error('Error fetching questions:', error));
}

function initQuiz() {
  fetchQuestions().then(() => {
    const quizItems = document.querySelectorAll('.quiz-item');
    const quizFormContainer = document.querySelector('.quiz-form-container');
    let userAnswers = [];
    let currentQuestionIndex = 0;


    quizItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentQuestionIndex = 0;
        displayNextQuestion();
      });
    });

    function displayNextQuestion() {
      const quizForm = createQuizForm(currentQuestionIndex);
      quizFormContainer.innerHTML = '';
      quizFormContainer.appendChild(quizForm);
      quizFormContainer.classList.remove('empty');
    }

    function createQuizForm(questionIndex) {
      const quizForm = document.createElement('form');
      quizForm.id = `quiz-form-${questionIndex + 1}`;
      quizForm.className = 'quiz-form';

      const quizTitle = document.createElement('h2');
      quizTitle.textContent = `Question ${questionIndex + 1}`;
      quizForm.appendChild(quizTitle);

      const question = questions[questionIndex];
      const questionElement = document.createElement('p');
      questionElement.textContent = question.text;
      quizForm.appendChild(questionElement);

      const answersContainer = document.createElement('div');
      answersContainer.className = 'answers-container';
      quizForm.appendChild(answersContainer);

      question.answers.forEach((answer, index) => {
        const answerContainer = document.createElement('div');
        answerContainer.className = 'answer-container';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.id = `q${question.id}-${index}`;
        radioInput.name = `q${question.id}`;
        radioInput.value = answer.text;
        answerContainer.appendChild(radioInput);

        const label = document.createElement('label');
        label.for = `q${question.id}-${index}`;
        label.textContent = answer.text;
        answerContainer.appendChild(label);

        answersContainer.appendChild(answerContainer);
      });

      if (questionIndex < questions.length - 1) {
        const nextButtonContainer = document.createElement('section');
        const nextButton = document.createElement('div');
        nextButton.className = 'button v18';
        const nextButtonLabel = document.createElement('div');
        nextButtonLabel.className = 'label b-buton';
        nextButtonLabel.textContent = 'Next';
        nextButton.appendChild(nextButtonLabel);
        const nextButtonIcon = document.createElement('span');
        nextButtonIcon.className = 'icon';
        const nextButtonIconSpan = document.createElement('span');
        nextButtonIcon.appendChild(nextButtonIconSpan);
        nextButton.appendChild(nextButtonIcon);
        const nextButtonIcon2 = document.createElement('span');
        nextButtonIcon2.className = 'icon2';
        nextButton.appendChild(nextButtonIcon2);
        nextButtonContainer.appendChild(nextButton);
        nextButton.addEventListener('click', () => {
          const answer = quizForm.querySelector('input[type="radio"]:checked').value;
          userAnswers.push(answer);
          currentQuestionIndex++;
          displayNextQuestion();
        });
        quizForm.appendChild(nextButtonContainer);
      } else {
        const submitButtonContainer = document.createElement('section');
        const submitButton = document.createElement('div');
        submitButton.className = 'button v18';
        const submitButtonLabel = document.createElement('div');
        submitButtonLabel.className = 'label b-buton';
        submitButtonLabel.textContent = 'Submit';
        submitButton.appendChild(submitButtonLabel);
        const submitButtonIcon = document.createElement('span');
        submitButtonIcon.className = 'icon';
        const submitButtonIconSpan = document.createElement('span');
        submitButtonIcon.appendChild(submitButtonIconSpan);
        submitButton.appendChild(submitButtonIcon);
        const submitButtonIcon2 = document.createElement('span');
        submitButtonIcon2.className = 'icon2';
        submitButton.appendChild(submitButtonIcon2);
        submitButtonContainer.appendChild(submitButton);
        submitButton.addEventListener('click', (event) => {
          event.preventDefault();
          const answer = quizForm.querySelector('input[type="radio"]:checked').value;
          userAnswers.push(answer);
          displayResult();
        });
        submitButtonContainer.appendChild(submitButton);
        quizForm.appendChild(submitButtonContainer);
      }

      const previousButtonContainer = document.createElement('section');
      const previousButton = document.createElement('div');
      previousButton.className = 'button v18';
      const previousButtonLabel = document.createElement('div');
      previousButtonLabel.className = 'label b-buton';
      previousButtonLabel.textContent = 'Previous';
      previousButton.appendChild(previousButtonLabel);
      const previousButtonIcon = document.createElement('span');
      previousButtonIcon.className = 'icon';
      const previousButtonIconSpan = document.createElement('span');
      previousButtonIcon.appendChild(previousButtonIconSpan);
      previousButton.appendChild(previousButtonIcon);
      const previousButtonIcon2 = document.createElement('span');
      previousButtonIcon2.className = 'icon2';
      previousButton.appendChild(previousButtonIcon2);
      previousButtonContainer.appendChild(previousButton);
      if (questionIndex === 0) {
        previousButton.disabled = true;
      } else {
        previousButton.addEventListener('click', () => {
          currentQuestionIndex--;
          displayNextQuestion();
        });
      }
      quizForm.appendChild(previousButtonContainer);

      const exitButtonContainer = document.createElement('section');
      const exitButton = document.createElement('div');
      exitButton.className = 'button v18';
      const exitButtonLabel = document.createElement('div');
      exitButtonLabel.className = 'label b-buton';
      exitButtonLabel.textContent = 'Exit';
      exitButton.appendChild(exitButtonLabel);
      const exitButtonIcon = document.createElement('span');
      exitButtonIcon.className = 'icon';
      const exitButtonIconSpan = document.createElement('span');
      exitButtonIcon.appendChild(exitButtonIconSpan);
      exitButton.appendChild(exitButtonIcon);
      const exitButtonIcon2 = document.createElement('span');
      exitButtonIcon2.className = 'icon2';
      exitButton.appendChild(exitButtonIcon2);
      exitButtonContainer.appendChild(exitButton);
      exitButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        quizFormContainer.classList.add('exit');
        setTimeout(() => {
          quizFormContainer.innerHTML = '';
          quizFormContainer.classList.remove('exit');
          quizFormContainer.classList.add('empty');
        }, 500);
      });
      quizForm.appendChild(exitButtonContainer);

      return quizForm;
    }

    function calculateScore(quizForm) {
      let score = 0;
      const answers = {};
      questions.forEach((question, index) => {
        const userAnswer = quizForm.querySelector(`input[name="q${question.id}"]:checked`);
        if (userAnswer) {
          answers[question.id] = userAnswer.value;
        }
      });
      questions.forEach((question, index) => {
        const correctAnswer = question.correctAnswer;
        const userAnswer = answers[question.id];
        if (userAnswer === correctAnswer) {
          score++;
        }
      });
      return score;
    }

    function displayResult() {
      let score = 0;
      userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
          score++;
        }
      });
      const resultContainer = document.createElement('div');
      resultContainer.className = 'result-container';

      const resultText = document.createElement('p');
      resultText.textContent = `You scored ${score} out of ${questions.length}!`;
      resultContainer.appendChild(resultText);

      const restartButtonContainer = document.createElement('section');
      const restartButton = document.createElement('div');
      restartButton.className = 'button v18';
      const restartButtonLabel = document.createElement('div');
      restartButtonLabel.className = 'label b-buton';
      restartButtonLabel.textContent = 'Restart';
      restartButton.appendChild(restartButtonLabel);
      const restartButtonIcon = document.createElement('span');
      restartButtonIcon.className = 'icon';
      const restartButtonIconSpan = document.createElement('span');
      restartButtonIcon.appendChild(restartButtonIconSpan);
      restartButton.appendChild(restartButtonIcon);
      const restartButtonIcon2 = document.createElement('span');
      restartButtonIcon2.className = 'icon2';
      restartButton.appendChild(restartButtonIcon2);
      restartButtonContainer.appendChild(restartButton);
      restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        userAnswers = [];
        displayNextQuestion();
      });
      resultContainer.appendChild(restartButtonContainer);

      quizFormContainer.innerHTML = '';
      quizFormContainer.appendChild(resultContainer);
    }
  });
}
initQuiz();
window.initQuiz = initQuiz;