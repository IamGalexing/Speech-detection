const words = document.querySelector(".words");
const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
words.appendChild(p);

btnStart.addEventListener("click", startRecognition);
btnStop.addEventListener("click", stopRecognition);

function startRecognition() {
  recognition.addEventListener("result", listenSpeech);
  recognition.start();
  recognition.addEventListener("end", recognition.start);
  btnStop.addEventListener("click", stopRecognition);
}

function stopRecognition() {
  recognition.stop();
  recognition.removeEventListener("result", listenSpeech);
  recognition.removeEventListener("end", recognition.start);
  btnStop.removeEventListener("click", stopRecognition);
}

function listenSpeech(e) {
  let transcript = Array.from(e.results)
    .map((result) => result[0].transcript)
    .join("");

  transcript = transcript[0].toUpperCase() + transcript.slice(1);
  p.textContent = transcript;

  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
}
