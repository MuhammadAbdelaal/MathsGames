//**
//all global variables
//*/
var playing = false;
let additionGame = false;
let subtractionGame = false;
let multiplyGame = false;
var score;
var time;
var correctAnswer;
let selectedId;

//**
//all elements needed to DOM manipulation
//*/
const startReset = document.getElementById("start-reset");
const scoreValue = document.getElementById("score-value");
const remainingTime = document.getElementById("timer-box-value");
const timerBox = document.getElementById("timer-box");
const gameOver = document.getElementById("game-over");
const gameOverScore = document.getElementById("game-over-score");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const correct = document.getElementById("correct");
const tryAgain = document.getElementById("try-again");
const addition = document.getElementById("addition");
const subtraction = document.getElementById("subtraction");
const multiply = document.getElementById("multiply");
const chooseGame = document.getElementById("choose-game");



//**
//* Game Logic
//*/

//check what Game is selected
chooseGame.addEventListener('click', getSelectedGame);

//if we click on the start/reset button
startReset.onclick = function () {

    //if we are playing
    if (playing) {
        //reload page
        // location.reload();
        location.href = location.href;//just for codepen reload
    } else { // if we are not playing

        //if the gameover box still visible from last playing try set it to none;
        if (gameOver.style.display === "block") {
            gameOver.style.display = "none";
        }
        
        if(additionGame === true || subtractionGame === true || multiplyGame === true) {//if Any Game was Selected
            //enter playing mode
            playing = true;
            // cahnge button text to "reset"
            startReset.innerHTML = "Reset Game";
            //set score to 0
            score = 0;
            scoreValue.innerHTML = score;
            // start timer and show game over when time is finished
            timer();
            // generate new Q&A
            newQA();
        } else {//if there is no selected game
            alert("Please Select one game first!!!")
        }
    }
}


//if we click on an answer box
for (var i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        //if we are playing
        if (playing) {
            //if the answer is correct
            if (this.innerHTML === String(correctAnswer)) {//yes
                //increase score by one
                score++;
                //add 10 seconds to the timer
                time += 5;
                scoreValue.innerHTML = score;
                //show correct box for 1.2 second and hide try again box
                tryAgain.style.display= "none";
                correct.style.display = "block";
                setTimeout(function () {
                    correct.style.display = "none";
                }, 1200);
                //generate new Q&A
                newQA();
            } else {//no
                //show try again box for 1.2 second and hide correct box
                correct.style.display = "none";
                tryAgain.style.display = "block";
                setTimeout(function () {
                    tryAgain.style.display = "none";
                }, 1200);
            }
        }
    }
}




//**
//* All functions for the game
//*/

// get selected Game
function getSelectedGame(e) {
    
    //get selected Game ID and save it
    selectedId = e.target.id;
    
    if (playing) {
        alert("Please Reset Game First");
    } else {//if not playing check what is the Game corresponding to the selected Id
        if (selectedId === "addition") {
            //enter addition mode
            additionGame = true;
            addition.classList.add('selected-game');
            //close playing mode for other games only
            subtractionGame = false;
            subtraction.classList.remove('selected-game');
            multiplyGame = false;
            multiply.classList.remove('selected-game');
        } else if (selectedId === "subtraction") {
            //enter subtraction mode
            subtractionGame = true;
            subtraction.classList.add('selected-game');
            //close playing mode for other games only
            additionGame = false;
            addition.classList.remove('selected-game');
            multiplyGame = false;
            multiply.classList.remove('selected-game');
        } else if (selectedId === "multiply") {
            //enter multiply mode
            multiplyGame = true;
            multiply.classList.add('selected-game');
            //close playing mode for other games only
            additionGame = false;
            addition.classList.remove('selected-game');
            subtractionGame = false;
            subtraction.classList.remove('selected-game');
        }
    }
}


//timer function and gameover
function timer() {
    //set time to initial value
    time = 40;
    //show timer box
    timerBox.style.display = "block";
    remainingTime.innerHTML = time;
    //start countdown counter
    var counter = setInterval(function () {
        //reduce time by one second
        time -= 1;
        //update timer box value with the new time
        remainingTime.innerHTML = time;

        // If the count down is finished, stop counter and show game over message
        if (time === 0) {//game over mode
            //stop timer
            clearInterval(counter);
            //show game over box and final score
            gameOver.style.display = "block";
            gameOverScore.innerHTML = score;
            //hide timer box 
            timerBox.style.display = "none";
            //change reset button to Start
            startReset.innerHTML = "Start Game";
            //close playing mode
            playing = false;
            additionGame = false;
            subtractionGame = false;
            multiplyGame = false;
            //clear Q&A values
            emptyQA();
        }
    }, 1000);
}

//generate new questions and answers
function newQA() {
    var x;
    var y;
    if(additionGame === true) {
        //show a random question
        x = 1 + Math.floor(29 * Math.random());
        y = 1 + Math.floor(99 * Math.random());
        question.innerHTML = x + "+" + y;

        //correct asnwer value
        correctAnswer = x + y;
    } else if(subtractionGame === true) {
        //show a random question
        x = 40 + Math.floor(79 * Math.random());
        y = 1 + Math.floor(39 * Math.random());
        question.innerHTML = x + "-" + y;

        //correct asnwer value
        correctAnswer = x - y;
    } else if(multiplyGame === true) {
        //show a random question
        x = 1 + Math.floor(30 * Math.random());
        y = 1 + Math.floor(30 * Math.random());
        question.innerHTML = x + "x" + y;

        //correct asnwer value
        correctAnswer = x * y;
    }
    
    //get arandom index between 0 and 3
    var correctIndex = Math.floor(4 * Math.random());
    //show the correct answer in the randomly chosen box
    choices.children[correctIndex].innerHTML = correctAnswer;

    //a var to store all generated answers in order to ensure no dublicated answers
    var answers = [correctAnswer];

    //show wrong answers in the other 3 empty boxes
    for (var i = 0; i < choices.children.length; i++) {

        //if an empty box is found, with index different than the one of the correct answer, generate the wrong answer inside it
        if (i !== correctIndex) {
            //generate wrong answers
            var wrongAnswer;
            //be sure the wrong answer does not equal to the answers generated above including the correct one
            do {
                wrongAnswer = 1 + Math.floor(99 * Math.random());//random wrong answer
            } while (answers.indexOf(wrongAnswer) > -1);
            //push the unique generated wrong answer to the answers var above
            answers.push(wrongAnswer);
            //use the unique generated wrong answer
            choices.children[i].innerHTML = wrongAnswer;
        }
    }
}

//clear Q&A values
function emptyQA() {
    //show empty question box
    question.innerHTML = "";
    //show empty answer boxes
    for (var i = 0; i < choices.children.length; i++) {
        //check boxes one by one
        var box = choices.children[i];
        box.innerHTML = "";
    }
}

//** JUST FOR LEARNING **//
// another way to check clicking on an answer box using closure technique
//*/
//if we click on an answer box
// for (var i = 0, len = choices.children.length; i < len; i++) {
//     //using closure technique to get the clicked box
//     (function (index) {
//         choices.children[i].onclick = function () {
//             //if we are playing
//             if (playing) {
//                 //save choosed answer in var
//                 var choosedAnswer = choices.children[index].innerHTML;
//                 //if the answer is correct
//                 if (choosedAnswer === String(correctAnswer)) {//yes
//                     //increase score by one
//                     score++;
//                     //add 10 seconds to the timer
//                     time += 10;
//                     scoreValue.innerHTML = score;
//                     //show correct box for 1.5 second
//                     correct.style.display = "block";
//                     setTimeout(function () {
//                         correct.style.display = "none";
//                     }, 1500);
//                     //generate new Q&A
//                     newAdditionQA();
//                 } else {//no
//                     //show try again box for 1.5 second
//                     tryAgain.style.display = "block";
//                     setTimeout(function () {
//                         tryAgain.style.display = "none";
//                     }, 1500);
//                 }

//             }
//         }
//     })(i);
// }
