const timeRemainingEl = document.querySelector('#time-remaining');
const startButtonEl = document.querySelector('.start-button');
let remainingTime = 10;

// could use ternary here if startButtonEl is presetn in page
timeRemainingEl.textContent = remainingTime;
let timer = setInterval(countdown, 1000);

function countdown() {
    remainingTime--;

    if (remainingTime === 0) {
       //  exit quiz 
       clearTimeout(timer); 
    }
    timeRemainingEl.textContent = remainingTime;
}
