const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';

const resultDiv = document.getElementById('result');

recognition.continuous = true; // Enable continuous recognition

recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    resultDiv.innerHTML = '<p>' + transcript + '</p>';
    resultDiv.classList.remove('empty'); // Remove the 'empty' class
    processCommand(transcript); // Call a function to process the command
};

recognition.start(); // Start the speech recognition

function processCommand(command) {
  console.log('Command: ', command);
  
      
}