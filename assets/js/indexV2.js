
// variables to keep track of data we care about across the entire quiz (otheriwse known as state)
// let highScore = 
// what is the time remaing
let time = questions.length * 100;; 
let userScore = 0
// let timerId;


// what question are we on currently 
let currentQindex = 0;

// varaibles to ref dom els (questions div, startBtn, answers div and so on)
let timer = document.querySelector('#clock')
let questionsElement = document.querySelector('#questions')
let questionsTitle = document.querySelector('#question-header')
let startButtonElement = document.querySelector("#start-btn")
let userChoice = document.querySelector("#question-1")
let answerFeedback = document.getElementById("answer-feedback")
let userScoreEl = document.getElementById("user-score")
let questionChoicesEl = document.querySelector(".btn-group")
// let questionHeaderElement = document.querySelector("#question-header")


function startGame(){
//    show the start page the once usr clicks start button, swap the pages out
    document.getElementById("start-game").className = ("show")
    startButtonElement.addEventListener("click", function displayElement () {
        document.getElementById("start-game").className = ("hide")
        document.getElementById("questions").className = ("show")
        timerFunc();
        document.getElementById("clock").className = ("show")
    
    // call new question function
    renderQuestion();
    // bring the questions to the front by changing its hidden state to display
    
   
    // check that we dsiplay the array correctly
    console.log(questions);
    // hide main starting page
    document.querySelector('.initial-hide').style.display = "none";
});


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
    for (let i = 0; i < questions.length; i++) {
        const choice = questions[i];
        // dynamically inject <li> and <button> into html
        const li = document.createElement('li');
        const button = document.createElement('button');
        // inject classes into the elements
        li.classList.add('show-main-page')
        button.classList.add('show-main-page', 'btn')
        // ask 1st questions
        document.getElementById("question-header").textContent = questions[i].heading;
    
        button.textContent = questions[i].quizQuestions[i]       
        // When an answer button is clicked
        button.addEventListener('click', function(){
            // if the answer is correct, give 10 score & feedback
            if (choice) {
                userScoreEl.textContent = userScore + 10;
                answerFeedback.textContent = 'Correct!'
            // Else remove 10 seconds of time & give feedback               
            } else {
                timer = time - 10;             
                answerFeedback.textContent = 'Incorrect.'
            }

            // Move on to next question
            const nextQuestionIndex = choice +1;

            // If it's the last question, end the game with a 500ms delay so user can see their feedback first
            if (nextQuestionIndex >= questions.length) {
                setTimeout(() => {return loserMessage()}, 600);
            } else {
            // else render the next question 
                setTimeout(() => {renderQuestion(nextQuestionIndex);}, 600);
            }
        });

        // Button becomes a child of  the list
        li.appendChild(button); 

        // List is appended to the correct section
        questionChoicesEl.append(li);   
}
}


// end Game 
function loserMessage() {
    alert("Times UP!!")
    //     // show end screen
    //     // hide quesitons screen
    //     // show final scrore
    //   }
}
}

startGame()



