let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
console.log(`Random number (for debugging): ${randomNumber}`); // For debugging purposes
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
        showCongratsPopup();
    } else if (userGuess < randomNumber) {
        message.textContent = 'Too low! Try again.';
        shakeOnFail();
    } else if (userGuess > randomNumber) {
        message.textContent = 'Too high! Try again.';
        shakeOnFail();
    } else {
        message.textContent = 'Please enter a valid number.';
        shakeOnFail();
    }
    guessInput.value = ''; // Clear input after each guess
});

resetBtn.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = 'Attempts: 0';
    message.textContent = 'Enter a number between 1 and 100:';
    guessInput.value = '';
    guessBtn.disabled = false;
});

// Allow Enter key to trigger guess
// This will work even if the Guess button is disabled, so check for that
guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !guessBtn.disabled) {
        guessBtn.click();
        // Add a quick visual feedback to the button
        guessBtn.classList.remove('shake');
        void guessBtn.offsetWidth;
        guessBtn.classList.add('shake');
    }
});

function shakeOnFail() {
    guessInput.classList.remove('shake');
    document.querySelector('.container').classList.remove('shake');
    // Force reflow to restart animation
    void guessInput.offsetWidth;
    void document.querySelector('.container').offsetWidth;
    guessInput.classList.add('shake');
    document.querySelector('.container').classList.add('shake');
}

// Add a custom congrats popup
function showCongratsPopup() {
    // Remove any existing popup
    const oldPopup = document.getElementById('congrats-popup');
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement('div');
    popup.id = 'congrats-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-emoji">🎉</span>
            <h2>Congratulations!</h2>
            <p>You guessed the correct number!</p>
            <button id="closePopupBtn">OK</button>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 10);
    document.getElementById('closePopupBtn').onclick = () => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    };
}