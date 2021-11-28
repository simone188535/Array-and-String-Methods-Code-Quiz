const highscoreListEl = document.querySelector("#highscore-section-list");
const clearHighscoreBtn = document.querySelector("#clear-highscore");
const quizScoreLocalStorage =
  JSON.parse(localStorage.getItem("js-quiz-highscores")) || [];

function displayHighscore() {
  // Sort data by score in desc order
  const sortedHighscore = quizScoreLocalStorage.sort(
    (firstItem, secondItem) => secondItem.score - firstItem.score
  );

  for (const userScores of sortedHighscore) {
    const ListItem = document.createElement("LI");

    ListItem.textContent = `${userScores.player} - ${userScores.score}`;
    highscoreListEl.appendChild(ListItem);
  }
}

function clearHighscores() {
  if (quizScoreLocalStorage) localStorage.removeItem("js-quiz-highscores");

  highscoreListEl.innerHTML = "";
}

clearHighscoreBtn.addEventListener("click", clearHighscores);
displayHighscore();
