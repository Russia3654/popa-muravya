function initQuiz() {
  const quizItems = document.querySelectorAll('.quiz-item');
  const quizFormContainer = document.querySelector('.quiz-form-container');
  let userAnswers = [];
  let currentQuestionIndex = 0;
  let selectedQuizIndex = 0;
  let questions = [];

  fetch('/popa-muravya/assets/json/question.json')
    .then(response => response.json())
    .then(data => {
      questions = data.quizzes;
      setupQuizItems();
    })
    .catch(error => console.log('Error loading questions:', error));


  function setupQuizItems() {
    quizItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        selectedQuizIndex = index;
        currentQuestionIndex = 0;
        userAnswers = [];
        displayNextQuestion();
      });
    });
  }

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

    // Add quiz title
    const quizTitle = document.createElement('h2');
    quizTitle.textContent = `Question ${questionIndex + 1}`;
    quizForm.appendChild(quizTitle);

    const question = questions[selectedQuizIndex].questions[questionIndex]; // Accessing the questions array
    if (!question) {
      console.error('Question not found for index:', questionIndex);
      return; // Exit the function if the question is not found
    }

    const questionElement = document.createElement('p');
    questionElement.textContent = question.text;
    quizForm.appendChild(questionElement);

    // Add question image if it exists
    if (question.image) {
      const questionImage = document.createElement('img');
      questionImage.src = question.image;
      questionImage.alt = 'Question Image';
      quizForm.appendChild(questionImage);
    }

    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';
    quizForm.appendChild(answersContainer);

    if (!question.answers) {
      console.error('Answers not found for question:', question);
      return; // Exit the function if answers are not found
    }

    // Determine if the question allows multiple answers
    const allowsMultipleAnswers = question.correctAnswers.length > 1;

    question.answers.forEach((answer, index) => {
      const answerContainer = document.createElement('div');
      answerContainer.className = 'answer-container';

      const input = document.createElement('input');
      input.type = allowsMultipleAnswers ? 'checkbox' : 'radio'; // Use checkbox for multiple answers
      input.id = `q${question.id}-${index}`;
      input.name = `q${question.id}`; // Keep the same name for grouping
      input.value = answer.text;
      answerContainer.appendChild(input);

      const label = document.createElement('label');
      label.htmlFor = `q${question.id}-${index}`; // Corrected from 'for' to 'htmlFor'

      // Add answer image if it exists
      if (answer.image) {
        const answerImage = document.createElement('img');
        answerImage.src = answer.image;
        answerImage.alt = answer.text;
        answerImage.style.width = '50px'; // Set a width for the answer images
        answerImage.style.height = '50px'; // Set a height for the answer images
        label.appendChild(answerImage);
      }

      label.appendChild(document.createTextNode(answer.text)); // Append text after image
      answerContainer.appendChild(label);

      answersContainer.appendChild(answerContainer);
    });

    // Next button logic
    if (questionIndex < questions[0].questions.length - 1) {
      const nextButtonContainer = document.createElement('section');
      const nextButton = document.createElement('div');
      nextButton.className = 'button v18';

      const nextButtonLabel = document.createElement('div');
      nextButtonLabel.className = 'label b-button';
      nextButtonLabel.textContent = 'Next';
      nextButton.appendChild(nextButtonLabel);

      // Adding icon for Next button
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
        const selectedAnswers = Array.from(quizForm.querySelectorAll(`input[name="q${question.id}"]:checked`))
          .map(input => input.value);
        userAnswers.push(selectedAnswers);
        currentQuestionIndex++;
        displayNextQuestion();
      });

      nextButtonContainer.appendChild(nextButton);
      quizForm.appendChild(nextButtonContainer);
    } else {
      // Submit button logic
      const submitButtonContainer = document.createElement('section');
      const submitButton = document.createElement('div');
      submitButton.className = 'button v18';

      const submitButtonLabel = document.createElement('div');
      submitButtonLabel.className = 'label b-button';
      submitButtonLabel.textContent = 'Submit';
      submitButton.appendChild(submitButtonLabel);

      // Adding icon for Submit button
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
        const selectedAnswers = Array.from(quizForm.querySelectorAll(`input[name="q${question.id}"]:checked`))
          .map(input => input.value);
        userAnswers.push(selectedAnswers);
        displayResult();
      });

      submitButtonContainer.appendChild(submitButton);
      quizForm.appendChild(submitButtonContainer);
    }

    // Previous button logic
    const previousButtonContainer = document.createElement('section');
    const previousButton = document.createElement('div');
    previousButton.className = 'button v18';

    const previousButtonLabel = document.createElement('div');
    previousButtonLabel.className = 'label b-button';
    previousButtonLabel.textContent = 'Previous';
    previousButton.appendChild(previousButtonLabel);

    // Adding icon for Previous button
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

    previousButtonContainer.appendChild(previousButton);
    quizForm.appendChild(previousButtonContainer);

    // Exit button logic
    const exitButtonContainer = document.createElement('section');
    const exitButton = document.createElement('div');
    exitButton.className = 'button v18';

    const exitButtonLabel = document.createElement('div');
    exitButtonLabel.className = 'label b-button';
    exitButtonLabel.textContent = 'Exit';
    exitButton.appendChild(exitButtonLabel);

    // Adding icon for Exit button
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

    exitButtonContainer.appendChild(exitButton);
    quizForm.appendChild(exitButtonContainer);

    return quizForm;
  }

  function displayResult() {
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';

    // Calculate score
    let score = 0;
    userAnswers.forEach((answer, index) => {
      // Check if the answer matches the correct answers
      if (JSON.stringify(answer) === JSON.stringify(questions[selectedQuizIndex].questions[index].correctAnswers)) {
        score++;
      }
    });

    const resultText = document.createElement('p');
    resultText.textContent = `You scored ${score} out of ${questions[selectedQuizIndex].questions.length}`;
    resultContainer.appendChild(resultText);

    // Restart button logic
    const restartButtonContainer = document.createElement('section');
    const restartButton = document.createElement('div');
    restartButton.className = 'button v18';

    const restartButtonLabel = document.createElement('div');
    restartButtonLabel.className = 'label b-button';
    restartButtonLabel.textContent = 'Restart';
    restartButton.appendChild(restartButtonLabel);

    // Adding icon for Restart button
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

    restartButtonContainer.appendChild(restartButton);
    resultContainer.appendChild(restartButtonContainer);

    // Clear the quiz form container and display the result
    quizFormContainer.innerHTML = '';
    quizFormContainer.appendChild(resultContainer);
  }
}
initQuiz();
window.initQuiz = initQuiz;