var character = document.getElementById("character");
var block = document.getElementById("block");
var text = document.getElementById("text");
var command = "";
var scoreText = document.getElementById("score");
var score = 0;
var gamestarted = false;
var button = document.getElementById("button");
var proTip = document.getElementById("proTip");
const openModalButton = document.getElementById("open-button");
var name = document.getElementById("name");

const submitScore = (name, score) => {
    if (name) {
        fetch('https://hidden-mesa-40035.herokuapp.com/addToLeaderBoard', {
            method: 'post',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                name: name,
                score: score
            })
        }).then(response => response.json()).then(data => {
            console.log(data);
        }
        )
    }
}
var scoreInterval;
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
//speech recognition setup
var message = document.querySelector('#message');
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;

recognition.onresult = function (event) {
    var last = event.results.length - 1;
    command = event.results[last][0].transcript;
    //console.log('Voice Input: ' + command + '.');
    text.textContent = 'Voice Input : ' + command + '.';
    if (!character.classList.contains("animate")) {
        if (command.toLowerCase().includes("monkey jump")) {
            character.classList.add("animate");
        }
        else if (command.toLowerCase().includes("monkey joe") == true) {
            character.classList.add("animate");
            text.textContent = 'Voice Input : ' + command + '.';
            endGame();
        }

        setTimeout(() => {
            character.classList.remove("animate");
        }, 2500);
    }
};
recognition.onspeechend = function () {
    recognition.stop();

};
recognition.onerror = function (event) {
    console.log('Error occurred in recognition: ' + event.error);
}



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


//skins


var ul = document.getElementById("skins");
import skins from "./skinList.js";
for (let i = 0; i < skins.length; i++) {
    var li = document.createElement("li");
    li.style.backgroundImage = "url" + "(" + skins[i].url + ")";
    li.onclick = () => {

        character.style.backgroundImage = "url" + "(" + skins[i].url + ")";
    };
    ul.appendChild(li);
    //li.setAttribute('id', skins[i].Name);
    //li.appendChild(document.createTextNode(skins[i].Name));
}

//overlay

const closeModalButton = document.getElementById("close-button");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
openModalButton.onclick = () => {
    modal.classList.add("active");
    overlay.classList.add("active");
}
const removeOverLay = () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}
closeModalButton.onclick = () => {
    removeOverLay();
}

overlay.onclick = () => {
    removeOverLay();
}

//LeaderBoard
var leaderBoard = document.getElementById("leaderBoard");

const addLeaders = () => {
    leaderBoard.replaceChildren();
    var p = document.createElement("p");
    p.setAttribute('id', "leaderText");
    p.appendChild(document.createTextNode("Leader Board"));
    leaderBoard.appendChild(p);
    fetch('https://hidden-mesa-40035.herokuapp.com/top3').then(response => response.json())
        .then((leaders) => {
            leaders.map(leader => {
                var li = document.createElement("li");
                //li.setAttribute('id', leader.Name);
                li.appendChild(document.createTextNode(leader.name + " : " + leader.score));
                leaderBoard.appendChild(li);

            });


        })
}

addLeaders();