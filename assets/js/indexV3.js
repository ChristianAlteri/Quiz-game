let time = questions.length * 100;
let userScore = 0;
let scoreList = [100, 200, 300, 5, 6, 7];
let highScore;
let userInitials;
let currentQuestion;
let currentQuestionIndex = 0;
let playerList = ["jo", "micheal"];

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
let formLabel = document.getElementById("form-label");
let inputFormEL = document.getElementById("high-score");
let endButton = document.getElementById("end-button");
let clearScoreBtn = document.getElementById("clear-score-btn");
let hsTable = document.getElementById("high-score-table");

function startGame() {
  currentQuestionIndex = 0;
  //    show the start page the once usr clicks start button, swap the pages out
  startGamePage.className = ("show", "font");
  startButtonElement.addEventListener("click", function displayElement() {
    startGamePage.className = "hide";
    questionsElement.className = ("show", "font");
    
    document.getElementById("clock").className = "show";
    timerFunc();

    // initalise scores in local storage
    // setScores();

    renderQuestion();
  });
}

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

  if (choice === currentQuestion.answer) {

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

    let highScore = scoreList[0]
    localStorage.setItem("high-Score", JSON.stringify(highScore));
    

    
    nextQuestion();
    // Else remove 10 seconds of time & give feedback
  } else {
    time -= 10;
    timer.textContent = "Time: " + time;
    answerFeedback.classList.add("show");
    answerFeedback.textContent = "Incorrect :(";
    nextQuestion();
  }

  function topFive() {
    if (userScore > scoreList[4]) {
      scoreList.push(userScore);
      scoreList.sort((a, b) => {
        return b.score - a.score;
    });
      scoreList.splice(5);
      localStorage.setItem("topFive", JSON.stringify(scoreList));
    //   return scoreList;
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

    formEl.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting and reloading the page
      validateForm();
      displayHighScores();
      // Store the data in localStorage
    });
  }

  function validateForm() {
    let userInitials = document.getElementById("formName");
    console.log(userInitials.value);
    if (userInitials === "") {
      formLabel.textContent = "Name must be filled out";
      return false;
    } else {
        const user = {
            name: userInitials.value,
            highscore: userScore,
        }

        // push user into exisiting user initials in LS
        const existingHighscores = JSON.parse(localStorage.getItem('userInitials')) || [];

        existingHighscores.push(user);
        // resave to LS
        localStorage.setItem('userInitials', JSON.stringify(existingHighscores));

    
      // playerList.push(userInitials.value);
      //   playerList.setItem("playerList", JSON.stringify(playerList.value));
    }
  }
}


function displayHighScores() {
  endGameEl.className = "hide";
  formEl.className = "hide";
  hsTable.className = "show";
    createTable()



// clear and end return home button
clearScoreBtn.addEventListener("click", function deleteItems() {
    localStorage.clear();
    // hsTable.className = "hide";
  });

  endButton.addEventListener("click", function () {
    endGame();
  });
}


function createTable(){
    // let table = document.createElement('table');
    // let headerRow = document.createElement('tr');
    const tbodyEl = hsTable.querySelector('tbody');
    // make html table and populate with topFive. use for loop. 
    // change top five to object with the same key value pair as line 179
    // get the items from ls
    const highscores = JSON.parse(localStorage.getItem('userInitials')) || [];

    tbodyEl.textContent = "";
    // loop thru the items
    highscores.forEach((highscore) => {
      console.log(highscore);
      // for each item, generate the trs
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.textContent = highscore.name;
      const tdScore = document.createElement('td');
      tdScore.textContent = highscore.highscore;

      tr.append(tdName, tdScore)

      tbodyEl.append(tr);

    })
   


    // let headers = ['Name', 'Score'];
    //     headers.forEach (headerText => {
    //     let header = document.createElement('th');
    //     let textNode = document.createTextNode(headerText);
    //     header.appendChild(textNode);
    //     headerRow.appendChild(header)
    //     table.appendChild(headerRow);
    //     hsTable.appendChild(headerRow)
    //     headerRow.className = "font high-score-table";
    //     header.className = "font high-score-table";
    //     // header.textContent = (localStorage.getItem(userInitials));

        // let userNameRow = document.createElement('th');
        // userNameRow.textContent = userScore
        // userNameRow.appendChild(header)
        
        



};

//   hsTable.className = "show";
//   localStorage.getItem(userInitials)
//   document.getElementById("row-1").textContent = (userInitials)


  

function endGame() {
  hsTable.className = "hide";
  //   hsTable.className = "show";
  startGame();

  console.log("game ended");
}

startGame();
