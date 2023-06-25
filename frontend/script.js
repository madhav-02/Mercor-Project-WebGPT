const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
const resultDiv = document.getElementById('result');
const speechButton = document.getElementById('speechButton');
recognition.continuous = true; // Enable continuous recognition
resultText=""
speechButton.addEventListener('click', handleButtonClick);
function handleButtonClick() {
  voiceOver(resultText);
}
recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    resultDiv.innerHTML = '<p>' + transcript + '</p>';
    resultDiv.classList.remove('empty');
    processCommand(transcript); 
};

recognition.start(); 
convertButton = document.getElementById('click');

window.addEventListener('beforeunload', cancelSpeech);

// Function to cancel speech synthesis
function cancelSpeech() {
  speechSynthesis.cancel();
}

const voiceOver = (command) => {
  resultDiv.textContent = command;
  if ('speechSynthesis' in window) {
    //console.log(speechSynthesis.getVoices());
    const speechUtterance = new SpeechSynthesisUtterance();
    speechUtterance.text = command;
    speechUtterance.voice = speechSynthesis.getVoices()[0];

    // Adjust volume and speed
    speechUtterance.volume = 1; // Range: 0 to 1
    speechUtterance.rate = 1; // Range: 0.1 to 10

speechSynthesis.speak(speechUtterance);
  }
  else
    console.log("Not possible");
  console.log("Dome");
}
async function processCommand(command) {
  console.log('USER spoke: ', command);    
  const url = 'http://localhost:8000/api/v1/openai';
  const data = {
    prompt: command
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  try{
    const response = await fetch(url, options);
    if(!response.ok){
      throw new Error(`HTTP Post error with status code - ${response.status}`);
    }
    const result = await response.json();
    console.log("Result was : ",result['aiResponse']);
    resultText = result['aiResponse']
  }catch(err){
    console.log("Error : ",err);
  }

}