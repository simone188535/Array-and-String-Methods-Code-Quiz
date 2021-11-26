const timeRemainingEl = document.querySelector("#time-remaining");
const startButtonEl = document.querySelector(".start-button");
const questionEl = document.querySelector(".question");
const anwserChoiceList = document.querySelector(".anwser-choices-list");
const anwserResultsEl = document.querySelector(".anwser-results");
const resultStatusEl = document.querySelector(".correct-incorrect");
const nextQuestionTimerEl = document.querySelector(".next-question-timer");
let remainingTimeToSolveQuiz = 100;
let remainingTimeToShowIfAnwserIsCorrect = 5;
let questionIndex = 0;

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

  if (remainingTimeToSolveQuiz === 0) {
    //  exit quiz go back to home page
    clearTimeout(quizTimer);
  }
  elementToDisplayTime.textContent = remainingTimeToSolveQuiz;
}

// Timer logic
let quizTimer = null;

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
  let isAnwserCorrect = null;
  let target = event.target; // where was the click?
  let timerInProgress = false;

  if (target.matches("li")) {
    isAnwserCorrect =
      (target.getAttribute("data-index") === quizData[questionIndex].anwser) ? 'Correct' : 'Incorrect';
      // display results
      resultStatusEl.textContent = isAnwserCorrect;
      anwserResultsEl.style.display = "block";
  }

  // set time out and show correct anwser
  function showAnswerCountDown() {
    timerInProgress = true;
    remainingTimeToShowIfAnwserIsCorrect--;

    // when time is up
    if (remainingTimeToShowIfAnwserIsCorrect === 0) {
      // remove timer
      clearTimeout(nextQuestionTimer);

      // reset timer 
      remainingTimeToShowIfAnwserIsCorrect = 5;

      // if there are still questions left unanwsered
      if (questionIndex !== quizData.length - 1) {
        // increment questionIndex
        questionIndex++;

        // remove all current anwser choices
        anwserChoiceList.innerHTML = '';
        
        // call displayQuestionAndAnwserChoices
        displayQuestionAndAnwserChoices();
      }

      // hide anwser results
      anwserResultsEl.style.display = "none";
      timerInProgress = false;

      //  add local storage
    }

    // update nextQuestionTimerEl timer
    nextQuestionTimerEl.textContent = remainingTimeToShowIfAnwserIsCorrect;
  }
    // update nextQuestionTimerEl time
    nextQuestionTimerEl.textContent = remainingTimeToShowIfAnwserIsCorrect;
    
    let nextQuestionTimer = setInterval(
      showAnswerCountDown,
      1000,
      anwserResultsEl
    );

}
anwserChoiceList.addEventListener("click", anwserChoiceValidation);
