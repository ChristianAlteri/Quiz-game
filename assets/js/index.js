// create global variables 
let userScore;
let highScore;
let userInitials;
let currentQuestion;
let currentQuestionIndex = 0;
let scoreList = [];
// target HTMl elements
let multipleCh = document.querySelector("#multiple-choices");
let feedbackWindow = document.querySelector("#answer-feedback");
let timer = document.querySelector("#clock");
let questionsElement = document.querySelector("#questions");
let startButtonElement = document.querySelector("#start-btn");
let answerFeedback = document.getElementById("answer-feedback");
let userScoreEl = document.getElementById("user-score");
let questionChoicesEl = document.querySelector(".btn-group");
let formEl = document.querySelector("#formEl");
let startGamePage = document.getElementById("start-game");
let feedbackSection = document.getElementById("feedback");
let endGameEl = document.getElementById("endgame");
let resultsEl = document.getElementById("results");
let formLabel = document.getElementById("form-label");
let endButton = document.getElementById("end-button");
let clearScoreBtn = document.getElementById("clear-score-btn");
let hsTable = document.getElementById("high-score-table");
let table = document.getElementById("table");
let viewHighScoreButton = document.getElementById("view-btn");

function startGame() {
  currentQuestionIndex = 0;
  userScore = 0;
  time = questions.length * 10;
  // swap pages out by switching classes
  startGamePage.className = "show column";
  startButtonElement.addEventListener("click", function displayElement() {
    startGamePage.className = "hide";
    timer.className = "show column";
    viewHighScoreButton.className = "show column btn-2";
    questionsElement.className = "show column";
    // begin timer and render first question
    timerFunc();
    renderQuestion();
  });
}
// timer function that counts down time and when time runs out ends the game.
function timerFunc() {
  timerId = setInterval(function () {
    time--;
    timer.textContent = "Time: " + time;
    if (time === 0 || time < 0) {
      timer.className = "hide";
      questionsElement.className = "hide";
      feedbackSection.className = "hide";
      clearInterval(timerId);
      endGame();
    }
  }, 1000);
}
// function which displays a question from the questions one by one.
function renderQuestion() {
  questionChoicesEl.innerHTML = "";
  currentQuestion = questions[currentQuestionIndex];
  viewHighScoreButton.addEventListener("click", displayHighScores);
  document.getElementById("question-header").textContent =
    currentQuestion.heading;
  for (let i = 0; i < 4; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.append(button);
    multipleCh.append(li);
    button.textContent = currentQuestion.quizQuestions[i];
    li.classList.add("show-main-page");
    button.classList.add("show-main-page", "btn");
    button.addEventListener("click", function (event) {
      checkUserAnswer(event.target);
    });
  }
}
// check answers based on choice and currentQuestion.answer. Push and store locally. If wrong deduct time and give feedback.
function checkUserAnswer(button) {
  let choice = button.textContent;
  if (choice === currentQuestion.answer) {
    const h3 = document.createElement("h3");
    feedbackWindow.append(h3);
    feedbackWindow.classList.add("show");
    answerFeedback.classList.add("show");
    userScoreEl.classList.add("show");
    userScore += 10;
    userScoreEl.textContent = userScore;
    localStorage.setItem("userScore", userScore);
    scoreList.push(userScore);
    scoreList.sort((a, b) => b - a);
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    answerFeedback.textContent = "Correct!";
    nextQuestion();
    let highScore = scoreList[0];
    localStorage.setItem("high-Score", JSON.stringify(highScore));
  } else {
    time -= 10;
    timer.textContent = "Time: " + time;
    answerFeedback.classList.add("show", "column");
    answerFeedback.textContent = "Incorrect";
    nextQuestion();
  }
  // -------------------------------------------------------------------
  // Tried to create a top five function
  // function topFive() {
  //   if (userScore > scoreList[4]) {
  //     scoreList.push(userScore);
  //     scoreList.sort((a, b) => {
  //       return b.score - a.score;
  //     });
  //     scoreList.splice(5);
  //     localStorage.setItem("topFive", JSON.stringify(scoreList));
  //   }
  // }
  // -------------------------------------------------------------------
  // increments index and calls renderQuestion until all questions are asked
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex !== questions.length) {
      renderQuestion(currentQuestionIndex);
    } else {
      displayForm();
    }
  }
// switches classes and displays form then calls validateForm() and displayHighScores()
  function displayForm() {
    timer.className = "hide";
    questionsElement.className = "hide";
    feedbackSection.className = "hide";
    endGameEl.className = ("show", "font", "column");
    formEl.className = ("show", "font", "btn");
    resultsEl.textContent = userScore;
    formEl.addEventListener("submit", function (event) {
      event.preventDefault();
      validateForm();
      displayHighScores();
    });
  }
// check user
  function validateForm() {
    let userInitials = document.getElementById("formName");
    if (userInitials.textContent === '') {
      formLabel.textContent = "Name must be filled out";
    } else {
// object to store user score and initials
      const user = {
        name: userInitials.value,
        highscore: userScore,
      };
      const existingHighscores =
        JSON.parse(localStorage.getItem("userInitials")) || [];
      existingHighscores.push(user);
      localStorage.setItem("userInitials", JSON.stringify(existingHighscores));
    }
  }
}
// switch HTML and create table
function displayHighScores() {
  endGameEl.className = "hide";
  formEl.className = "hide";
  hsTable.className = "show column";
  createTable();
  clearScoreBtn.addEventListener("click", function deleteItems() {
    localStorage.clear();
    table.className = "hide";
  });

  endButton.addEventListener("click", function () {
    endGame();
  });
}
// create table elements and append to children before appending to HTML
function createTable() {
  const tbodyEl = hsTable.querySelector("tbody");
  const highscores = JSON.parse(localStorage.getItem("userInitials")) || [];
  tbodyEl.textContent = "";
  highscores.forEach((highscore) => {
    console.log(highscore);
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.textContent = highscore.name;
    const tdScore = document.createElement("td");
    tdScore.textContent = highscore.highscore;
    tr.append(tdName, tdScore);
    tbodyEl.append(tr);
  });
}
// end and restart game
function endGame() {
  hsTable.className = "hide";
  startGame();
  console.log("game ended");
}
// calling start game
startGame();
