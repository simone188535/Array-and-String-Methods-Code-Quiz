const timeRemainingEl = document.querySelector('#time-remaining');
const startButtonEl = document.querySelector('.start-button');
let remainingTime = 100;

// could use ternary here if startButtonEl is presetn in page
let timer = setInterval(countdown, 1000);

function countdown() {
    timeRemainingEl.textContent = remainingTime;
    remainingTime--;

    if (remainingTime === 0) {
       //  exit quiz 
       clearTimeout(timer);
    }
}
