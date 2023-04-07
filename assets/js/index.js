
// variables to keep track of data we care about across the entire quiz (otheriwse known as state)

// what is the time remaing
// let time = questions.length * 10; 
let time = 3; 
let timerId;


// what question are we on currently 
let currentQindex = 0;

// varaibles to ref dom els (questions div, startBtn, answers div and so on)
let timer = document.querySelector('#clock')
let questionsElement = document.querySelector('#questions')
let startButtonElement = document.querySelector("#start-btn")
let questionHeaderElement = document.querySelector("#question-header")

// start the game


// target the start game button and hide the page.
// hide the start screeen
// un-hide questions
startButtonElement.addEventListener("click", function displayElement () {
    console.log("clicked");
   
    // bring the questions to the front by changing its hidden state to display
    document.querySelector('.hide').style.display = "block";
    // check that we dsiplay the array correctly
    console.log(questions);
    // hide main starting page
    document.querySelector('.initial-hide').style.display = "none";
});


function timerFunc() {
    if (time === 0 || currentQindex >= questionBank.length) {
        clearInterval(timeInterval);
        endGame();
        let timeInterval = setInterval(function() {
            time--;
            timer.textContent = time;
      })  
    }
}

    // start a timer
// setTimeout(function(){
//     console.log("countdown begins");
//     if (time > 0) {
//         document.querySelector('#clock').textContent = time;
//         time--
//         console.log(time);
//     }else{ 
//         console.log("call endGame()");
//         // endGame()
//     }
// });


// ask a question
    // update title element with question title
    // var titleEl = document.querySelector('#q-title')
    // titleEl.textContent = //
    // clear out old quesiton choices 9reset inner html)
    // loop over question choices 
        // create a new button for every question
        // append choice text to button
        // append choice button to div-id=answers

// get current question from arrray
questionHeaderElement.textContent = questions

// user clicked on answer
    // target their click, using javascript event 
    // if they were wrong, take time away and siplay wrong feedback
    // else, display right
    // if we have ran out of time or questiojns, run EndGame func, else, run ask a question again

// end Game 
// function endGame() {
//     alert("Times UP!!")
//     // show end screen
//     // hide quesitons screen
//     // show final scrore
//   }



