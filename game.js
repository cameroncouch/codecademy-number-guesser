let target;
let lastFocused;

const humanGuessInput = document.getElementById('human-guess');

const roundNumberDisplay = document.getElementById('round-number');

const computerGuessDisplay = document.getElementById('computer-guess');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const targetNumberDisplay = document.getElementById('target-number');
const computerWinsDisplay = document.getElementById('computer-wins');

const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round');

const overlay = document.getElementsByClassName('overlay')[0];
const alert = document.getElementsByClassName('alert')[0];
const closeX = document.getElementsByClassName('close')[0];

overlay.addEventListener('click', () => {
  alert.classList.add('hidden');
  alert.classList.remove('visible');
  overlay.classList.add('hidden');
  overlay.classList.remove('visible');
  lastFocused.focus();
})

closeX.addEventListener('click', () => {
  alert.classList.add('hidden');
  alert.classList.remove('visible');
  overlay.classList.add('hidden');
  overlay.classList.remove('visible');
  lastFocused.focus();
})

guessButton.addEventListener('click', (e) => {
  // Generate the target value
  target = generateTarget();
  // Retrieve the player's guess
  const currentHumanGuess = humanGuessInput.value;
  // Pop alert if human guess is < 0 or > 9
  if(currentHumanGuess < 0 || currentHumanGuess > 9) {
    alert.classList.add('visible');
    alert.classList.remove('hidden');
    overlay.classList.add('visible');
    overlay.classList.remove('hidden');
    lastFocused = e.target;
    lastFocused.blur();
    closeX.focus();
    return;
  }
  // Make a random 'computer guess'
  const computerGuess = Math.floor(Math.random() * 10);

  // Display the computer guess and the target
  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;
  
  // Determine if the human or computer wins:
  const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target)
  const winner = humanIsWinner ? 'human' : 'computer'

  // Update the correct score:
  updateScore(winner);

  // Display the winner
  if (humanIsWinner) {
    guessButton.innerText = 'You Win!!!!!';
    guessButton.classList.toggle('winning-text')
  } else {
    computerWinsDisplay.innerText = 'Computer Wins!!!';
  }

  // winnerDisplay.innerText = humanIsWinner ? 'You win!' : 'Computer wins!';

  // Display the current scores:
  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;
  
  // Set the correct disabled state for the buttons
  guessButton.setAttribute('disabled', true)
  nextRoundButton.removeAttribute('disabled');
});

nextRoundButton.addEventListener('click', () => {
  // Increase the round number
  advanceRound();
  // Display the new round number
  roundNumberDisplay.innerText = currentRoundNumber;

  // Set the correct disabled state for the buttons
  nextRoundButton.setAttribute('disabled', true);
  guessButton.removeAttribute('disabled');

  // Reset the guess input box and the target number display:
  targetNumberDisplay.innerText = '?';
  guessButton.innerText = 'Make a Guess';
  humanGuessInput.value = '';
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
  guessButton.classList.remove('winning-text');
});

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value + 1;
  handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value - 1;
  handleValueChange(humanGuessInput.value);
});

const handleValueChange = value => {
  // added by CMC - disabling the guessButton if the input is null, this allowed the user to always win
  if(!value) { 
    guessButton.setAttribute('disabled', true); 
  } else if(value) { 
    guessButton.removeAttribute('disabled');
  }
  if (value > 0 && value <= 9) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else if (value > 9) {
    addButton.setAttribute('disabled', true);
  } else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
}

humanGuessInput.addEventListener('input', function(e) {
  handleValueChange(e.target.value);
});
