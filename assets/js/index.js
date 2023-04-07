
// variables to keep track of data we care about across the entire quiz (otheriwse known as state)

// what is the time remaing
let time = questions.length * 10;; 
// let timerId;


// what question are we on currently 
let currentQindex = 0;

// varaibles to ref dom els (questions div, startBtn, answers div and so on)
let timer = document.querySelector('#clock')
let questionsElement = document.querySelector('#questions')
let startButtonElement = document.querySelector("#start-btn")
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
    console.log(questions);
// loop over question choices 
// get current question from array and put it in header
for (let i = 0; i < questions.length; i++) {
    document.getElementById("#question-header").textContent = questions.heading
    // questionHeaderElement.textContent = questions.heading
    // let question = questions[i];
    console.log(questions);
    
}

// create a new button for every question
// append choice text to button
// append choice button to div-id=answers
// clear out old quesiton choices 9reset inner html)
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



