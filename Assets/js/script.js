const timeRemainingEl = document.querySelector("#time-remaining");
const startButtonEl = document.querySelector(".start-button");
const questionEl = document.querySelector(".question");
const anwserChoiceList = document.querySelector(".anwser-choices-list");
let remainingTime = 100;

function countdown() {
    remainingTime--;
  
    if (remainingTime === 0) {
      //  exit quiz
      clearTimeout(timer);
    }
    timeRemainingEl.textContent = remainingTime;
}

// Timer logic
let timer = null;

if (timeRemainingEl) {
  timeRemainingEl.textContent = remainingTime;
  timer = setInterval(countdown, 1000);
}


let questionIndex = 0;
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

    for (const quizOptions in quizDataAnwserChoices) {
      const ListItem = document.createElement("LI");

      ListItem.textContent = quizDataAnwserChoices[quizOptions];
      anwserChoiceList.appendChild(ListItem);
    }
}

// if question and anwserChoiceList elements are available
if (questionEl && anwserChoiceList) {
    displayQuestionAndAnwserChoices();
}

anwserChoiceList.add