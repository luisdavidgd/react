const colors = ['red', 'blue', 'green', 'yellow'];
let sequence = [];
let player = [];
let locked = true;

const buttons = document.querySelectorAll('.button');
const message = document.getElementById('message');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.color;
    if (locked) return;

    player.push(color);
    flashButton(color);

    if (!checkSequence()) {
      message.textContent = 'You lost! Reload to try again.';
      locked = true;
    } else if (player.length === sequence.length) {
      message.textContent = 'Correct! Next round...';
      setTimeout(() => nextRound(), 1000);
    }
  });
});

function flashButton(color) {
  const button = document.querySelector(`[data-color="${color}"]`);
  button.style.opacity = 0.5;
  setTimeout(() => button.style.opacity = 1, 300);
}

function playSequence() {
  locked = true;
  let i = 0;
  const interval = setInterval(() => {
    flashButton(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      locked = false;
    }
  }, 600);
}

function checkSequence() {
  for (let i = 0; i < player.length; i++) {
    if (player[i] !== sequence[i]) return false;
  }
  return true;
}

function nextRound() {
  player = [];
  sequence.push(colors[Math.floor(Math.random() * colors.length)]);
  message.textContent = `Round ${sequence.length}`;
  playSequence();
}

// Start the game
message.textContent = 'Game is starting!';
setTimeout(() => nextRound(), 1000);
