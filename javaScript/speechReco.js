//speech recognition setup
var text = document.getElementById("text");
var command = "";
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

