const timeRemainingEl = document.querySelector("#time-remaining");
const startButtonEl = document.querySelector(".start-button");
const questionEl = document.querySelector(".question");
const questionChoiceList = document.querySelector(".question-choices-list");
let remainingTime = 100;

// Timer logic
let timer = null;

if (timeRemainingEl) {
  timeRemainingEl.textContent = remainingTime;
  timer = setInterval(countdown, 1000);
}

function countdown() {
  remainingTime--;

  if (remainingTime === 0) {
    //  exit quiz
    clearTimeout(timer);
  }
  timeRemainingEl.textContent = remainingTime;
}

const quizData = [
  { question: "", anwser: "", options: [] },
  { question: "", anwser: "", options: [] },
  { question: "", anwser: "", options: [] },
  { question: "", anwser: "", options: [] },
];
