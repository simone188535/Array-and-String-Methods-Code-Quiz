const timeRemainingContainerEl = document.querySelector(
  "#time-remaining-container"
);
const timeRemainingEl = document.querySelector("#time-remaining");
const startButtonEl = document.querySelector(".start-button");
const questionEl = document.querySelector(".question");
const anwserChoiceList = document.querySelector(".anwser-choices-list");
const anwserResultsEl = document.querySelector(".anwser-results");
const resultStatusEl = document.querySelector(".correct-incorrect");
const nextQuestionTimerEl = document.querySelector(".next-question-timer");
const clearHighscoreEl = document.querySelector("#clear-highscore");
const overviewEl = document.querySelector(".overview");
const subContent = document.querySelector(".sub-content");
let areInitialsDisplayed = false;
let remainingTimeToSolveQuiz = 75;
let remainingTimeToShowIfAnwserIsCorrect = 3;
let questionIndex = 0;
let userScore = 0;
const quizScoreLocalStorage =
  JSON.parse(localStorage.getItem("js-quiz-highscores")) || [];

function displayInitialsInput() {
  timeRemainingContainerEl.innerHTML = "";
  overviewEl.innerHTML = " <strong> Please add your initials </strong>";
  subContent.innerHTML = `<article class="initials">
          <input type="text" id="user-initials" name="user-initials" /><br /><br />
          <input id="user-initials-submit" type="submit" value="Submit" />
        </article>`;

  const userInitialsSubmitBtn = document.querySelector("#user-initials-submit");

  userInitialsSubmitBtn.addEventListener("click", obtainUsersInitials);
}

function quizCountDown(elementToDisplayTime) {
  remainingTimeToSolveQuiz--;

  if (remainingTimeToSolveQuiz <= 0) {
    areInitialsDisplayed = true;
    // reset time to zero
    remainingTimeToSolveQuiz = 0;
    // reset user score
    userScore = 0;
    // clear timer
    clearTimeout(quizTimer);

    // display initial inputs
    displayInitialsInput();
  }
  elementToDisplayTime.textContent = remainingTimeToSolveQuiz;
}

// Timer logic
timeRemainingEl.textContent = remainingTimeToSolveQuiz;
let quizTimer = setInterval(quizCountDown, 1000, timeRemainingEl);

const quizData = [
  {
    question: "Which method returns an array of strings?",
    anwser: 0,
    options: [".split()", ".toString()", ".trim()", ".toLowerCase()"],
  },
  {
    question:
      "Which method calls a function for each element in an array without returning a new array?",
    anwser: 3,
    options: [".map()", ".includes()", ".pop()", ".forEach()"],
  },
  {
    question:
      "Which method checks to see if a given value is included within a specific string?",
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

function anwserChoiceValidation(event) {
  // this is a great place to do event delegation
  let isAnwserCorrect;
  let target = event.target;

  if (target.matches("li")) {
    if (
      Number(target.getAttribute("data-index")) ===
      quizData[questionIndex].anwser
    ) {
      isAnwserCorrect = "correct";
      userScore += 20;
    } else {
      isAnwserCorrect = "incorrect";
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
      if (areInitialsDisplayed) return false;
      // display initial inputs
      displayInitialsInput();
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

function obtainUsersInitials(event) {
  event.preventDefault();
  const userInitialsEl = document.querySelector("#user-initials");

  // set local storage and user initials
  const userInitials = userInitialsEl.value.trim();
  quizScoreLocalStorage.push({
    player: userInitials,
    score: userScore,
  });

  localStorage.setItem(
    "js-quiz-highscores",
    JSON.stringify(quizScoreLocalStorage)
  );

  // go to user highscores page
  window.location.href = "../html/highscore.html";
}

anwserChoiceList.addEventListener("click", anwserChoiceValidation);
displayQuestionAndAnwserChoices();
