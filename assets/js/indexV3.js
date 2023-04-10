
// variables to keep track of data we care about across the entire quiz (otheriwse known as state)
// let highScore = 
// what is the time remaing
// let timerId;


// what question are we on currently 
// let choiceButton = 
// let button = button
let time = questions.length * 100;
let userScore = 0;
// let timeRemaining = time;
let scoreList = [100, 200 ,300, 5, 6, 7];
let highScore;
// let topFive = scoreList.slice(0, 3);
let currentQuestion;
let currentQuestionIndex = 0;




let multipleCh = document.querySelector("#multiple-choices")
let feedbackWindow = document.querySelector("#answer-feedback")
let timer = document.querySelector('#clock')
let questionsElement = document.querySelector('#questions')
let questionsTitle = document.querySelector('#question-header')
let startButtonElement = document.querySelector("#start-btn")
let userChoice = document.querySelector("#question-1")
let answerFeedback = document.getElementById("answer-feedback")
let userScoreEl = document.getElementById("user-score")
let questionChoicesEl = document.querySelector(".btn-group")
let userName = document.querySelector("#name")
// let userScore = document.querySelector("#scores")



function startGame(){
        
        
//    show the start page the once usr clicks start button, swap the pages out
        document.getElementById("start-game").className = ("show", "font")
        startButtonElement.addEventListener("click", function displayElement () {
            document.getElementById("start-game").className = ("hide")
            document.getElementById("questions").className = ("show", "font")
            timerFunc();
            document.getElementById("clock").className = ("show")
            
        // initalise scores in local storage
            // setScores();
        
    // call new question function
            renderQuestion();
    // bring the questions to the front by changing its hidden state to display
    
   
   
        // endGame ();
});
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//


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

function renderQuestion(index) {
    questionChoicesEl.innerHTML = "";
    currentQuestion = questions[currentQuestionIndex];
    // const li = document.createElement('li');
    // const button = document.createElement('button');
    // console.log(currentQuestion);
    document.getElementById("question-header").textContent = currentQuestion.heading
        for (let i = 0; i < 4; i++){
            
            // dynamically create and append <li> and <button> into html
            const li = document.createElement('li');
            const button = document.createElement('button');
            li.append(button)
            multipleCh.append(li)
            // write the answer choices
            button.textContent = currentQuestion.quizQuestions[i];
            // inject classes into the elements to display
            li.classList.add('show-main-page')
            button.classList.add('show-main-page', 'btn')
            button.addEventListener('click', function(event) {
                 
                
                checkUserAnswer(event.target)
            })
    }
}

function checkUserAnswer(button) {
        
        // let choice = document.button.value
        
        let choice = button.textContent
        console.log(choice);
        console.log(currentQuestion.answer[currentQuestionIndex]);
        // if the answer is correct, give 10 score & feedback
        if (choice === currentQuestion.answer[currentQuestionIndex]) {
            // create and show feedback 

            const h3 = document.createElement('h3');
            feedbackWindow.append(h3)
            feedbackWindow.classList.add('show')
            answerFeedback.classList.add('show')
            userScoreEl.classList.add('show')
            currentUserScore = (userScore + 10)
            userScoreEl.textContent = (currentUserScore);
            localStorage.setItem("currentUserScore", currentUserScore);
            // push current score into sorted array and store in local storage
            scoreList.push(currentUserScore);
            scoreList.sort((a, b) => b - a)
            localStorage.setItem("scoreList", JSON.stringify(scoreList));
            answerFeedback.textContent = 'Correct!'
            // creates a top five array
            topFive();
            // creates a highscore based on topfive array
            let highScore = scoreList[0];
            localStorage.setItem("highscore", JSON.stringify(highScore));
            currentQuestionIndex++
            console.log(currentQuestionIndex);
            // nextQuestion()
            nextQuestion();
        // Else remove 10 seconds of time & give feedback               
        } else {
            timerId = setInterval(function () {
                timer.textContent = "Time: " + (time - 10); 
                })    
            answerFeedback.classList.add('show')       
            answerFeedback.textContent = 'Incorrect :('
            currentQuestionIndex++
            nextQuestion();
        }
        
        // const nextQuestionIndex = currentQuestionIndex + 1;
        // if (nextQuestionIndex >= questions.length){
        //     updateScores()
        // } else{
        //     renderQuestion(nextQuestionIndex)
        // }


// ask user to save their score to the local storage 
function updateScores(){
    // swap pages out
 
    document.getElementById("userScore").className = ("show", "font")
// set input to local storage in an object called scores with a key of name: value of userScore: 
    userName.localStorage.setItem('name', );
    userScore.localStorage.setItem('userScore', );
    displayHighscores();
};


function topFive(){
    if (currentUserScore > scoreList[4]){
      scoreList.push(currentUserScore);
      scoreList.sort((a, b) => b - a);
      scoreList.splice(5);
      localStorage.setItem("topFive", JSON.stringify(scoreList));
      
    }
  }

function nextQuestion(){
    if(currentQuestionIndex !== questions.length){
        renderQuestion(currentQuestionIndex);
    }else{
        displayForm();
    }


}

    
function displayForm() {
    console.log("Ya feeel me");
    displayHighScores();
}

function displayHighScores(){
    // swap pages and grab data from local storage and parse to html elements


};


// end Game 
function endGame () {
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
    let userScore = 0
    let localScores = JSON.parse(localStorage.getItem("highscore"));
    if (localScores !== null) {
        scoreList = localScores;
    }
}


startGame()



