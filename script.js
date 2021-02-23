var character = document.getElementById("character");
var block = document.getElementById("block");
var text = document.getElementById("text");
var command = "";
var scoreText = document.getElementById("score");
var score = 0;
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
    console.log('Voice Input: ' + command + '.');
    text.textContent = 'Voice Input : ' + command + '.';
    if (!character.classList.contains("animate")) {
        if (command.toLowerCase() == "monkey jump") {
            character.classList.add("animate");
        }
        else if (command.toLowerCase().includes("monkey joe") == true) {
            character.classList.add("animate");
            text.textContent = 'Voice Input : ' + command + '.';
            endGame();
        }

        setTimeout(() => {
            character.classList.remove("animate");
        }, 1500);
    }
};
recognition.onspeechend = function () {
    recognition.stop();

};
recognition.onerror = function (event) {
    console.log('Error occurred in recognition: ' + event.error);
}
recognition.start();
var checkDead = setInterval(() => {
    var topPosition = parseFloat(window.getComputedStyle(character).getPropertyValue("top"));
    var leftPoistion = parseFloat(window.getComputedStyle(block).getPropertyValue("left"));
    var bottomPosition = parseFloat(window.getComputedStyle(character).getPropertyValue("bottom"));

    if (bottomPosition == -150) {
        try {
            recognition.start();
        }
        catch {

        }
    }
    if (leftPoistion < 20 && leftPoistion > 0) {
        score++;
    }
    if (leftPoistion < 20 && leftPoistion > 0 && topPosition >= 130) {
        //endGame();
        console.log("hit");
    }
    scoreText.textContent = "Score: " + score;
}, 50)
var endGame = () => {

    block.style.animation = "none";
    block.style.display = "none";
    character.style.display = "none";
    alert("game over");
}