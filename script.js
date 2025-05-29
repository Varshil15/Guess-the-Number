let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const themeToggle = document.getElementById('themeToggle');

guessBtn.addEventListener('click', () => {
    const userGuess = Number(guessInput.value);
    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;

    if (userGuess === randomNumber) {
        message.textContent = `🎉 Correct! The number was ${randomNumber}.`;
        guessBtn.disabled = true;
    } else if (userGuess < randomNumber) {
        message.textContent = 'Too low! Try again.';
    } else if (userGuess > randomNumber) {
        message.textContent = 'Too high! Try again.';
    } else {
        message.textContent = 'Please enter a valid number.';
    }
});

resetBtn.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = 'Attempts: 0';
    message.textContent = 'Enter a number between 1 and 100:';
    guessInput.value = '';
    guessBtn.disabled = false;
});

// Set initial theme toggle text
themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
});

// Allow Enter key to trigger guess
guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        guessBtn.click();
    }
});