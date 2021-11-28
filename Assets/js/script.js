const timeRemainingEl = document.querySelector("#time-remaining");
const startButtonEl = document.querySelector(".start-button");
const questionEl = document.querySelector(".question");
const anwserChoiceList = document.querySelector(".anwser-choices-list");
const anwserResultsEl = document.querySelector(".anwser-results");
const resultStatusEl = document.querySelector(".correct-incorrect");
const nextQuestionTimerEl = document.querySelector(".next-question-timer");
const userInitialsEl = document.querySelector("#user-initials");
const userInitialsSubmitBtn = document.querySelector("#user-initials-submit");
const clearHighscoreEl = document.querySelector('#clear-highscore');
const highscoreListEl = document.querySelector('#highscore-section-list');
let remainingTimeToSolveQuiz = 75;
let remainingTimeToShowIfAnwserIsCorrect = 3;
let questionIndex = 0;
let userScore = 0;
let quizScoreLocalStorage = JSON.parse(localStorage.getItem('js-quiz-highscores')) || [];
// let currentUserQuizScoreLocalStorage = JSON.parse(localStorage.getItem('js-quiz-highscores-user')) || '';

// function quizCountDown(remainingTime, elementToDisplayTime) {

//   remainingTime--;
//   console.log(remainingTime);

//   if (remainingTime === 0) {
//     //  exit quiz go back to home page
//     clearTimeout(timer);
//   }
//   elementToDisplayTime.textContent = remainingTime;
// }

// // Timer logic
// let quizTimer = null;

// if (timeRemainingEl) {
//   timeRemainingEl.textContent = remainingTimeToSolveQuiz;
//   quizTimer = setInterval(quizCountDown, 1000, remainingTimeToShowIfAnwserIsCorrect, timeRemainingEl);
// }

function quizCountDown(elementToDisplayTime) {
  remainingTimeToSolveQuiz--;

  if (remainingTimeToSolveQuiz <= 0) {
    // reset time to zero
    remainingTimeToSolveQuiz = 0;
    // reset user score
    userScore = 0;
    //  exit quiz go back to home page
    window.location.href = "../../index.html";
    // clear timer
    clearTimeout(quizTimer);
  }
  elementToDisplayTime.textContent = remainingTimeToSolveQuiz;
}

// Timer logic
let quizTimer;

if (timeRemainingEl) {
  timeRemainingEl.textContent = remainingTimeToSolveQuiz;
  quizTimer = setInterval(quizCountDown, 1000, timeRemainingEl);
}

// anwser should be a number
const quizData = [
  {
    question: "Which method returns an Array of Strings?",
    anwser: 0,
    options: [".split()", ".toString()", ".trim()", ".toLowerCase()"],
  },
  {
    question:
      "Which method calls a function for each element in the array without returning a new array?",
    anwser: 3,
    options: [".map()", ".includes()", ".pop()", ".forEach()"],
  },
  {
    question:
      "Which method check to see if a given value is included within a specific string?",
    anwser: 1,
    options: [".slice()", ".includes()", ".splice()", ".toString()"],
  },
  {
    question: "Which method combines the values of multiple strings?",
    anwser: 2,
    options: [".match()", ".search()", ".concat()", ".toString()"],
  },
];

function displayQuestionAndAnwserChoices() {
  // display question
  questionEl.textContent = quizData[questionIndex].question;

  // display anwser choices iteratively
  const quizDataAnwserChoices = quizData[questionIndex].options;

  for (const anwserChoices in quizDataAnwserChoices) {
    const ListItem = document.createElement("LI");

    // add data attr to element
    ListItem.setAttribute("data-index", anwserChoices);
    ListItem.textContent = quizDataAnwserChoices[anwserChoices];
    anwserChoiceList.appendChild(ListItem);
  }
}

// if question and anwserChoiceList elements are available
if (questionEl && anwserChoiceList) {
  displayQuestionAndAnwserChoices();
}

function anwserChoiceValidation(event) {
  // this is a great place to do event delegation
  let isAnwserCorrect;
  let target = event.target; // where was the click?
  // MOVE THIS TO GLOBALS SCOPPPPPEE
  // let timerInProgress = false;

  if (target.matches("li")) {
    if (
      Number(target.getAttribute("data-index")) ===
      quizData[questionIndex].anwser
    ) {
      isAnwserCorrect = "Correct";
      userScore += 20;
    } else {
      isAnwserCorrect = "Incorrect";
      // subtract time
      remainingTimeToSolveQuiz -= 15;
    }

    // if there are still questions left unanwsered
    if (questionIndex !== quizData.length - 1) {
      // increment questionIndex
      questionIndex++;

      // remove all current anwser choices
      anwserChoiceList.innerHTML = "";

      // call displayQuestionAndAnwserChoices
      displayQuestionAndAnwserChoices();
    } else {
      // go to user initial page
      window.location.href = "../html/quiz-complete.html";
    }

    // display previous results
    resultStatusEl.textContent = isAnwserCorrect;
    anwserResultsEl.style.display = "block";

    function hidePrevResultsCountDown() {
      remainingTimeToShowIfAnwserIsCorrect--;

      if (remainingTimeToShowIfAnwserIsCorrect === 0) {
        // hide previous results
        anwserResultsEl.style.display = "none";

        // remove timer
        clearTimeout(hidePrevResults);

        // reset timer
        remainingTimeToShowIfAnwserIsCorrect = 5;
      }
    }
    // hide prev results after a couple of seconds
    let hidePrevResults = setInterval(hidePrevResultsCountDown, 1000);
  }

}

function displayHighscore() {
  
    // SORT data
    const sortedHighscore = quizScoreLocalStorage.sort((firstItem, secondItem) => firstItem.score + secondItem.score);

    // console.log('sortedHighscore ', sortedHighscore);
    for(const userScores of sortedHighscore) {
      const ListItem = document.createElement("LI");

      ListItem.textContent = `${userScores.player} - ${userScores.score}`;
      highscoreListEl.appendChild(ListItem);
    }
}

function obtainUsersInitials(event) {
  event.preventDefault();

  // set local storage and user initials
  const userInitials = userInitialsEl.value.trim();
  quizScoreLocalStorage.push({
    player: userInitials,
    score: userScore
  });
  
  localStorage.setItem('js-quiz-highscores', JSON.stringify(quizScoreLocalStorage));

  // go to user initial page
  window.location.href = "../html/highscore.html";
}

if (anwserChoiceList) {
  anwserChoiceList.addEventListener("click", anwserChoiceValidation);
}

if (userInitialsSubmitBtn) {
  // console.log('userScore', userScore);
  userInitialsSubmitBtn.addEventListener("click", obtainUsersInitials);
}

if (highscoreListEl) {
  displayHighscore();
}