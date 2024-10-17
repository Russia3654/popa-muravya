function initQuiz() {
  const quizItems = document.querySelectorAll('.quiz-item');
  const quizFormContainer = document.querySelector('.quiz-form-container');
  let userAnswers = [];
  let currentQuestionIndex = 0;
  let selectedQuizIndex = 0;
  const questions = [
    {
      title: "Valorant",
      questions: [
        {
          id: 1,
          text: 'What is the name of the first map released in Valorant?',
          answers: [
            { text: 'Ascent' },
            { text: 'Bind' },
            { text: 'Haven' },
            { text: 'Split' }
          ],
          correctAnswers: ['Ascent']
        },
        {
          id: 2,
          text: 'Which agent is known for their ability to heal allies?',
          answers: [
            { text: 'Sage' },
            { text: 'Phoenix' },
            { text: 'Jett' },
            { text: 'Reyna' }
          ],
          correctAnswers: ['Sage']
        },
        {
          id: 3,
          text: 'What is the name of the game mode where players must plant a spike?',
          answers: [
            { text: 'Plant/Defuse' },
            { text: 'Spike Rush' },
            { text: 'Deathmatch' },
            { text: 'Escalation' }
          ],
          correctAnswers: ['Plant/Defuse']
        },
        {
          id: 4,
          text: 'Which agent is known for their ability to create smokes?',
          answers: [
            { text: 'Breach' },
            { text: 'Omen' },
            { text: 'Brimestone' },
            { text: 'Viper' }
          ],
          correctAnswers: ['Breach', 'Omen', 'Brimestone', 'Viper']
        },
        {
          id: 5,
          text: 'What is the name of the currency used to buy abilities and guns?',
          answers: [
            { text: 'Credits' },
            { text: 'Valorant Points' },
            { text: 'Radianite' },
            { text: 'Creds' }
          ],
          correctAnswers: ['Credits']
        },
        {
          id: 6,
          text: 'Which agent is known for their ability to create a wall?',
          answers: [
            { text: 'Phoenix' },
            { text: 'Jett' },
            { text: 'Reyna' },
            { text: 'Killjoy' }
          ],
          correctAnswers: ['Phoenix', 'Killjoy']
        }
      ]
    },
    {
      title: "War Thunder",
      questions: [
        {
          id: 7,
          text: 'What is the name of the first nation available in War Thunder?',
          answers: [
            { text: 'USA' },
            { text: 'Germany' },
            { text: 'USSR' },
            { text: 'United Kingdom' }
          ],
          correctAnswers: ['USA']
        },
        {
          id: 8,
          text: 'Which tank is known for its high speed and low armor?',
          answers: [
            { text: 'M3 Lee' },
            { text: 'M4 Sherman' },
            { text: 'T-34' },
            { text: 'Panther' }
          ],
          correctAnswers: ['M3 Lee']
        },
        {
          id: 9,
          text: 'What is the name of the game mode where players must capture points?',
          answers: [
            { text: 'Domination' },
            { text: 'Conquest' },
            { text: 'Air Battles' },
            { text: 'Naval Battles' }
          ],
          correctAnswers: ['Domination']
        },
        {
          id: 10,
          text: 'Which plane is known for its high maneuverability?',
          answers: [
            { text: 'P-51 Mustang' },
            { text: 'Bf 109' },
            { text: 'Spitfire' },
            { text: 'Zero' }
          ],
          correctAnswers: ['P-51 Mustang', 'Bf 109', 'Spitfire', 'Zero']
        },
        {
          id: 11,
          text: 'What is the name of the currency used to buy vehicles and upgrades?',
          answers: [
            { text: 'Silver Lions' },
            { text: 'Golden Eagles' },
            { text: 'War Bonds' },
            { text: 'Credits' }
          ],
          correctAnswers: ['Silver Lions']
        },
        {
          id: 12,
          text: 'Which nation has the most vehicles available in the game?',
          answers: [
            { text: 'USA' },
            { text: 'Germany' },
            { text: 'USSR' },
            { text: 'United Kingdom' }
          ],
          correctAnswers: ['USSR']
        }
      ]
    },
    {
      title: "PC Building",
      questions: [
        {
          id: 13,
          text: 'What is the primary function of a CPU?',
          answers: [
            { text: 'To store data' },
            { text: 'To provide power to components' },
            { text: 'To execute instructions' },
            { text: 'To cool the system' }
          ],
          correctAnswers: ['To execute instructions']
        },
        {
          id: 14,
          text: 'Which component is responsible for storing data?',
          answers: [
            { text: 'CPU' },
            { text: 'GPU' },
            { text: 'RAM' },
            { text: 'HDD' }
          ],
          correctAnswers: ['HDD', 'RAM']
        },
        {
          id: 15,
          text: 'What is the purpose of a power supply unit?',
          answers: [
            { text: 'To cool the system' },
            { text: 'To provide power to components' },
            { text: 'To store data' },
            { text: 'To execute instructions' }
          ],
          correctAnswers: ['To provide power to components']
        },
        {
          id: 16,
          text: 'Which type of RAM is commonly used in modern systems?',
          answers: [
            { text: 'DDR3' },
            { text: 'DDR4' },
            { text: 'DDR5' },
            { text: 'DDR6' }
          ],
          correctAnswers: ['DDR4', 'DDR5']
        },
        {
          id: 17,
          text: 'What is the primary function of a GPU?',
          answers: [
            { text: 'To execute instructions' },
            { text: 'To store data' },
            { text: 'To provide power to components' },
            { text: 'To render graphics' }
          ],
          correctAnswers: ['To render graphics']
        },
        {
          id: 18,
          text: 'Which component is responsible for cooling the system?',
          answers: [
            { text: 'CPU' },
            { text: 'GPU' },
            { text: 'RAM' },
            { text: 'Cooling System' }
          ],
          correctAnswers: ['Cooling System']
        }
      ]
    },
    {
      title: "League of Legends",
      questions: [
        {
          id: 19,
          text: 'What is the name of the most popular champion in League of Legends?',
          answers: [
            { text: 'Ashe' },
            { text: 'Ryze' },
            { text: 'Lux' },
            { text: 'Lee Sin' }
          ],
          correctAnswers: ['Ashe']
        },
        {
          id: 20,
          text: 'Which role is responsible for dealing physical damage to enemies?',
          answers: [
            { text: 'Top Laner' },
            { text: 'Jungler' },
            { text: 'Mid Laner' },
            { text: 'Marksman' }
          ],
          correctAnswers: ['Marksman']
        },
        {
          id: 21,
          text: 'What is the name of the game mode where players must destroy the enemy Nexus?',
          answers: [
            { text: 'Summoner\'s Rift' },
            { text: 'Twisted Treeline' },
            { text: 'Howling Abyss' },
            { text: 'ARAM' }
          ],
          correctAnswers: ['Summoner\'s Rift']
        },
        {
          id: 22,
          text: 'Which champion is known for their ability to steal enemy spells?',
          answers: [
            { text: 'Syndra' },
            { text: 'Anivia' },
            { text: 'LeBlanc' },
            { text: 'Sylas' }
          ],
          correctAnswers: ['Sylas']
        },
        {
          id: 23,
          text: 'What is the name of the currency used to buy items and champions?',
          answers: [
            { text: 'Blue Essence' },
            { text: 'Orange Essence' },
            { text: 'Riot Points' },
            { text: 'IP' }
          ],
          correctAnswers: ['Blue Essence', 'Riot Points']
        },
        {
          id: 24,
          text: 'Which champion is known for their ability to create a clone of themselves?',
          answers: [
            { text: 'LeBlanc' },
            { text: 'Shaco' },
            { text: 'Zed' },
            { text: 'Ezreal' }
          ],
          correctAnswers: ['LeBlanc']
        }
      ]
    }
  ];

  quizItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      selectedQuizIndex = index;
      currentQuestionIndex = 0;
      userAnswers = [];
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
      nextButtonLabel.className = 'label b-buton';
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
      submitButtonLabel.className = 'label b-buton';
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
    previousButtonLabel.className = 'label b-buton';
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
    exitButtonLabel.className = 'label b-buton';
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
    restartButtonLabel.className = 'label b-buton';
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