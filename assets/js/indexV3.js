let time = questions.length * 100;
let userScore = 0;
let scoreList = [100, 200, 300, 5, 6, 7];
let highScore;
let currentQuestion;
let currentQuestionIndex = 0;

let multipleCh = document.querySelector("#multiple-choices");
let feedbackWindow = document.querySelector("#answer-feedback");
let timer = document.querySelector("#clock");
let questionsElement = document.querySelector("#questions");
let questionsTitle = document.querySelector("#question-header");
let startButtonElement = document.querySelector("#start-btn");
let userChoice = document.querySelector("#question-1");
let answerFeedback = document.getElementById("answer-feedback");
let userScoreEl = document.getElementById("user-score");
let questionChoicesEl = document.querySelector(".btn-group");
let userName = document.querySelector("#name");
let formButton = document.querySelector("#input-initials");
let formInput = document.querySelector("#saveBtn");
let formEl = document.querySelector("#formEl");
let startGamePage = document.getElementById("start-game");
let feedbackSection = document.getElementById("feedback");
let endGameEl = document.getElementById("endgame");
let resultsEl = document.getElementById("results");
let formLabel = document.getElementById("form-label")

function startGame() {
  //    show the start page the once usr clicks start button, swap the pages out
  startGamePage.className = ("show", "font");
  startButtonElement.addEventListener("click", function displayElement() {
    startGamePage.className = "hide";
    questionsElement.className = ("show", "font");
    timerFunc();
    document.getElementById("clock").className = "show";

    // initalise scores in local storage
    // setScores();

    renderQuestion();
  });
}

// create a timer
function timerFunc() {
  timerId = setInterval(function () {
    // count down in seconds, time
    time--;
    // use a string plus the variable and display the time in DOM
    // update title element with question title
    timer.textContent = "Time: " + time;
    // break loop if time is 0
    if (time === 0) {
      clearInterval(timerId);
      loserMessage();
    }
  }, 1000);
}

function renderQuestion() {
  questionChoicesEl.innerHTML = "";
  currentQuestion = questions[currentQuestionIndex];
  // const li = document.createElement('li');
  // const button = document.createElement('button');
  // console.log(currentQuestion);
  document.getElementById("question-header").textContent =
    currentQuestion.heading;
  for (let i = 0; i < 4; i++) {
    // dynamically create and append <li> and <button> into html
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.append(button);
    multipleCh.append(li);
    // write the answer choices
    button.textContent = currentQuestion.quizQuestions[i];
    // inject classes into the elements to display
    li.classList.add("show-main-page");
    button.classList.add("show-main-page", "btn");
    button.addEventListener("click", function (event) {
      checkUserAnswer(event.target);
    });
  }
}

function checkUserAnswer(button) {
  let choice = button.textContent;

  console.log("currentQuestion.answer", currentQuestion.answer);
  console.log("currentQuestionIndex", currentQuestionIndex);
  console.log("currentQuestion.answer", currentQuestion.answer);

  if (choice === currentQuestion.answer) {
    // debugger
    const h3 = document.createElement("h3");
    feedbackWindow.append(h3);
    feedbackWindow.classList.add("show");
    answerFeedback.classList.add("show");
    userScoreEl.classList.add("show");
    userScore += 10;
    userScoreEl.textContent = userScore;
    localStorage.setItem("userScore", userScore);

    // push current score into sorted array and store in local storage
    scoreList.push(userScore);
    scoreList.sort((a, b) => b - a);
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    answerFeedback.textContent = "Correct!";

    // Creates a top five array and a high score
    topFive();
    let highScore = scoreList[0];
    localStorage.setItem("highscore", JSON.stringify(highScore));

    nextQuestion();
    // Else remove 10 seconds of time & give feedback
  } else {
    time -= 10;
    timer.textContent = "Time: " + time;
    answerFeedback.classList.add("show");
    answerFeedback.textContent = "Incorrect :(";
    nextQuestion();
  }

  // // ask user to save their score to the local storage
  // function updateScores(){
  //     // swap pages out
  //     document.getElementById("userScore").className = ("show", "font")
  // // set input to local storage in an object called scores with a key of name: value of userScore:
  //     userName.localStorage.setItem('name', );
  //     userScore.localStorage.setItem('userScore', );
  //     displayHighscores();
  // };

  function topFive() {
    if (userScore > scoreList[4]) {
      scoreList.push(userScore);
      scoreList.sort((a, b) => b - a);
      scoreList.splice(5);
      localStorage.setItem("topFive", JSON.stringify(scoreList));
    }
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex !== questions.length) {
      renderQuestion(currentQuestionIndex);
    } else {
      displayForm();
    }
  }

  function displayForm() {
    // debugger
    // clear time, feedback and question section
    timer.className = "hide";
    questionsElement.className = "hide";
    feedbackSection.className = "hide";
    // load form in

    endGameEl.className = ("show", "font");
    formEl.className = ("show", "font");
    resultsEl.textContent = userScore;
    // endGameEl.style.display = "flex"

    // endGameEl.append(formEl);

    formEl.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    validateForm()
    // Store the data in localStorage
    
    });
    displayHighScores();
  };

  function validateForm() {
    let x = document.forms.getElementsByName("form-name").value;
    if (x == "") {
        formLabel.textContent = "Name must be filled out";
      return false;
    }else {
        localStorage.setItem('userInitials', (userInitials + userScore));
    }
  }
  function displayHighScores() {
    // swap pages and grab data from local storage and parse to html elements
  }

  // end Game
  function endGame() {
    console.log("game ended");
    // startGame();

    // clearInterval(timerId);
    // // sectionEndGame.classList.remove('hide');
    // questionChoicesEl.classList.add('hide');
    // timer.classList.add('hide');
    // getElementById("start-game").classList.add('hide');
    // // finalScoreEl.textContent = userScore;
    // answerFeedback.classList.add('hide');
    // // homeButton.classList.remove('hide');
  }
}

function resetGameScores() {
  let userScore = 0;
  let localScores = JSON.parse(localStorage.getItem("highscore"));
  if (localScores !== null) {
    scoreList = localScores;
  }
}

startGame();
