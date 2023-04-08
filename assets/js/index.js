
// variables to keep track of data we care about across the entire quiz (otheriwse known as state)
// let highScore = 
// what is the time remaing
let time = questions.length * 10;; 
// let timerId;


// what question are we on currently 
let currentQindex = 0;

// varaibles to ref dom els (questions div, startBtn, answers div and so on)
let timer = document.querySelector('#clock')
let questionsElement = document.querySelector('#questions')
let startButtonElement = document.querySelector("#start-btn")
let userChoice = document.querySelector("#question-1")
// let questionHeaderElement = document.querySelector("#question-header")




// target the start game button and hide the page.
// hide the start screeen
// un-hide questions
// start the game
startButtonElement.addEventListener("click", function displayElement () {
    console.log("clicked");
    // initialise timer
    timerFunc();
    // bring the questions to the front by changing its hidden state to display
    document.querySelector('.hide').style.display = "block";
    // call new question function
    newQuestion();
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

    
// ask a question
function newQuestion() {
// loop over question choices 
// get current question from array and put it in header
        for (let i = 0; i < questions.length; i++) {
            document.getElementById("question-header").textContent = questions[i].heading
            document.getElementById("question-1").textContent = questions[i].answers[0]
            document.getElementById("question-2").textContent = questions[i].answers[1]
            document.getElementById("question-3").textContent = questions[i].answers[2]
            document.getElementById("question-4").textContent = questions[i].answers[3]
            userChoice.addEventListener("click", function isAnswer() {
                console.log("button clicked");
            // if(isAnswerSelected === true)
        
            
    
    // here we correctly access the html element and push whats in our array to the DOM. 
    // Now we need to make sure our for loop does this one by one and only going to the 
    // next question if the user presses a multiple choice.
    

          })  // if the users clicked button is not the answer stored in the object then wrong 
   
}


// create a new button for every question
// append choice text to button
// append choice button to div-id=answers
// clear out old quesiton choices reset inner html)
}    
    


// user clicked on answer
    // target their click, using javascript event 
    // if they were wrong, take time away and siplay wrong feedback
    // else, display right
    // if we have ran out of time or questiojns, run EndGame func, else, run ask a question again

// end Game 
function loserMessage() {
    alert("Times UP!!")
}
//     // show end screen
//     // hide quesitons screen
//     // show final scrore
//   }



