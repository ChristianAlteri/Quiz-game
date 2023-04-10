
// variables to keep track of data we care about across the entire quiz (otheriwse known as state)
// let highScore = 
// what is the time remaing
// let timerId;


// what question are we on currently 
// let choiceButton = 
// let button = button
let userScore = 0
let time = questions.length * 100;; 
let highScore = 0
let currentQuestion;
let currentQuestionIndex = 0;
let multipleCh = document.querySelector("#multiple-choices")
let feedbackWindow = document.querySelector("#answer-feedback")
// varaibles to ref dom els (questions div, startBtn, answers div and so on)
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
    
   
    // check that we dsiplay the array correctly
    // console.log(questions);
    // hide main starting page
    // document.querySelector('.initial-hide').style.display = "none";
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

function renderQuestion(index) {
    questionChoicesEl.innerHTML = "";
    currentQuestion = questions[currentQuestionIndex];
    // const li = document.createElement('li');
    // const button = document.createElement('button');
    // console.log(currentQuestion);
    document.getElementById("question-header").textContent = currentQuestion.heading
        for (let i = 0; i < 4; i++){
            console.log(i);
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
                console.log(button);
                
                checkUserAnswer(event.target)
            })
    }
}

function checkUserAnswer(button) {
        console.log(button);
        // let choice = document.button.value
        let choice = button.textContent
        console.log(choice);
        console.log(currentQuestion.answer[currentQuestionIndex]);
        // if the answer is correct, give 10 score & feedback
        if (choice === currentQuestion.answer[currentQuestionIndex]) {
            // create and show feedback 

            createFeedbackResponses();

            const h3 = document.createElement('h3');
            feedbackWindow.append(h3)
            feedbackWindow.classList.add('show')
            answerFeedback.classList.add('show')
            userScoreEl.classList.add('show')
            // update score and store it locally



            currentUserScore = (userScore + 10)
            userScoreEl.textContent = (currentUserScore);
            localStorage.setItem("currentUserScore", currentUserScore)
            answerFeedback.textContent = 'Correct!'
            // nextQuestion()
        // Else remove 10 seconds of time & give feedback               
        } else {
            timer = time - 10;      
            answerFeedback.classList.add('show')       
            answerFeedback.textContent = 'Incorrect :('
        }
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex >= questions.length){
            updateScores()
        } else{
            renderQuestion(nextQuestionIndex)
        }


// ask user to save their score to the local storage 
function updateScores(){
    // swap pages out
    
    document.getElementById("userScore").className = ("show", "font")
// set input to local storage in an object called scores with a key of name: value of userScore: 
    userName.localStorage.setItem('name', );
    userScore.localStorage.setItem('userScore', );
    displayHighscores();
};

function displayHighscores(){
    // swap pages
    document.getElementById("endgame").className = ("hide")
    document.getElementById("high-score").className = ("show", "font")
    console.log(userScore);
    if (userScore > highScore) {
        highScore = userScore;
      }
    document.getElementById("high-score").textContent = JSON.parse(scores.userScore)  
};

function setScores(){
    
}

// end Game 
function endGame() {
    alert("Times UP!!")
    //     // show end screen
    //     // hide quesitons screen
    //     // show final scrore
    //   }
}
}

startGame()



