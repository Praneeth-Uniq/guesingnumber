// script.js
let randomNumber, min, max, attempts = 0;
const startBtn = document.getElementById("startBtn");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const guessInput = document.getElementById("guessInput");
const hint = document.getElementById("hint");
const attemptsDisplay = document.getElementById("attempts");
const rangeDisplay = document.getElementById("rangeDisplay");
const history = document.getElementById("guessHistory");
const gameArea = document.querySelector(".game-area");
const historySection = document.querySelector(".history");
const themeToggle = document.getElementById("themeToggle");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");
const gameOverSound = document.getElementById("gameOverSound");

startBtn.addEventListener("click", () => {
  min = parseInt(minInput.value);
  max = parseInt(maxInput.value);
  if (isNaN(min) || isNaN(max) || min >= max) {
    alert("Please enter a valid range.");
    return;
  }
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  rangeDisplay.textContent = `${min} and ${max}`;
  attempts = 0;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
  gameArea.classList.remove("hidden");
  historySection.classList.remove("hidden");
  history.innerHTML = "";
  hint.textContent = "";
});

guessBtn.addEventListener("click", () => {
  const guess = parseInt(guessInput.value);
  if (isNaN(guess)) {
    alert("Please enter a number.");
    return;
  }
  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
  const listItem = document.createElement("li");
  listItem.textContent = `Attempt ${attempts}: ${guess}`;
  history.appendChild(listItem);

  if (guess === randomNumber) {
    hint.textContent = "🎉 Correct! You guessed it!";
    correctSound.play();
    winSound.play();
    launchConfetti();
  } else if (guess < randomNumber) {
    hint.textContent = "Too Low! Try again.";
    wrongSound.play();
  } else {
    hint.textContent = "Too High! Try again.";
    wrongSound.play();
  }
});

resetBtn.addEventListener("click", () => {
  minInput.value = "";
  maxInput.value = "";
  guessInput.value = "";
  hint.textContent = "";
  attemptsDisplay.textContent = "Attempts: 0";
  gameArea.classList.add("hidden");
  historySection.classList.add("hidden");
  history.innerHTML = "";
  document.body.classList.remove("celebrate");
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Confetti animation using canvas-confetti CDN
function launchConfetti() {
  const confettiScript = document.createElement('script');
  confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
  confettiScript.onload = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  document.body.appendChild(confettiScript);
}
