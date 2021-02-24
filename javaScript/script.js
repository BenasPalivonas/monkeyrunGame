import addLeaders from './addLeaders.js'
import submitScore from "./submitScore.js"
var character = document.getElementById("character");
var block = document.getElementById("block");
var scoreText = document.getElementById("score");
var score = 0;
var gamestarted = false;
var button = document.getElementById("button");
var proTip = document.getElementById("proTip");
const openModalButton = document.getElementById("open-button");
var name = document.getElementById("name");
var scoreInterval;
//start game
var startGame = () => {
    leaderBoard.style.display = "none";
    openModalButton.style.display = "none";
    name.style.visibility = "hidden";
    score = 0;
    gamestarted = true;
    block.style.visibility = "visible";
    block.classList.add("animateBlock")
    button.style.display = "none";
    proTip.style.display = "none";
    scoreInterval = setInterval(() => {
        console.log("running");
        if (gamestarted == true) {
            score++;
        }
        return 0;
    }, 6000);
}
button.onclick = startGame;
//gamelogic
var checkDead = setInterval(() => {
    var topPosition = parseFloat(window.getComputedStyle(character).getPropertyValue("top"));
    var leftPoistion = parseFloat(window.getComputedStyle(block).getPropertyValue("left"));
    var bottomPosition = parseFloat(window.getComputedStyle(character).getPropertyValue("bottom"));

    if (bottomPosition == -290) {
        try {
            recognition.start();
        }
        catch {

        }
    }
    if (leftPoistion < 300 && leftPoistion > 0 && topPosition >= 200) {

        endGame();
    }
    scoreText.textContent = "Score: " + score;

}, 50)

var endGame = () => {
    clearInterval(scoreInterval);
    submitScore(name.value.toLowerCase(), score);
    addLeaders();
    if (character.classList = "animate") {
        character.classList.remove("animate");
    }

    gamestarted = false;
    block.style.visibility = "hidden";
    button.style.display = "block";
    openModalButton.style.display = "block";
    block.classList.remove("animateBlock");
    proTip.style.display = "block";
    name.style.visibility = "visible";
    leaderBoard.style.display = "block";

}

//overlay

//LeaderBoard
var leaderBoard = document.getElementById("leaderBoard");
addLeaders();