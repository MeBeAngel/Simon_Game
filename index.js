// node index.js

// Save element id's
let title = document.querySelector(".title");
let green = document.getElementById("green");
let red = document.getElementById("red");
let yellow = document.getElementById("yellow");
let blue = document.getElementById("blue");
let block = document.querySelectorAll(".block");



const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
var started = false;






document.addEventListener("keypress", () => {
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        title.innerHTML = "Level " + level;
        nextSequence();
        started = true;
    }
})

document.addEventListener("click", () => {
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        title.innerHTML = "Level " + level;
        nextSequence();
        started = true;
    }
})




// Handles button clicks
for (let i = 0; i < block.length; i++) {

    // Animate chosen button on click
    function animateButtonOnClick(buttonColor, colorStr, revertColorStr) {
        buttonColor.style.backgroundColor = colorStr;
        setTimeout(() => {
            buttonColor.style.backgroundColor = revertColorStr;
        }, 150);
    }

    block[i].addEventListener("click", () => {

        let userChosenColour = block[i].id;
        userClickedPattern.push(userChosenColour);

        if (block[i] === block[0]) {
            animateButtonOnClick(green, "#00E400", "green");
            playSound(userChosenColour);
        } else if (block[i] === block[1]) {
            animateButtonOnClick(red, "#FF6666", "red");
            playSound(userChosenColour);
        } else if (block[i] === block[2]) {
            animateButtonOnClick(yellow, "#FFFF99", "yellow");
            playSound(userChosenColour);
        } else if (block[i] === block[3]) {
            animateButtonOnClick(blue, "#0080FF", "blue");
            playSound(userChosenColour);
        } else {
            console.log("err")
        }

        checkAnswer(userClickedPattern.length - 1);
    })

}




//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        title.innerHTML = "Game Over, Press Any Key to Restart";

        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }

}




function nextSequence() {
    userClickedPattern = [];
    level++;

    title.innerHTML = "Level " + level;

    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNum];
    gamePattern.push(randomChosenColour);

    document.getElementById(randomChosenColour).style.opacity = "0";
    setTimeout(() => {
        document.getElementById(randomChosenColour).style.opacity = "1";
    }, 250);

    playSound(randomChosenColour);
}





function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}





function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}