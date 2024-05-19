let currentPlayer = 'X';
let cells = document.getElementsByClassName('cell');
let gameOver = false;
let score = {
  X: 0,
  O: 0
};
let mode = 'human';

function handleClick(cellIndex) {
  if (!gameOver && cells[cellIndex].innerHTML === '') {
    cells[cellIndex].innerHTML = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer);
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (mode === 'ai') {
      makeAIMove();
    } else {
      updatePlayerTurn();
    }
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].innerHTML === currentPlayer &&
      cells[b].innerHTML === currentPlayer &&
      cells[c].innerHTML === currentPlayer
    ) {
      gameOver = true;
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      score[currentPlayer]++;
      updateScore();
      alert(currentPlayer + ' wins!');
      break;
    }
  }

  if (!gameOver && isBoardFull()) {
    gameOver = true;
    alert('It\'s a tie!');
  }
}

function resetBoard() {
  currentPlayer = 'X';
  gameOver = false;
  for (let cell of cells) {
    cell.innerHTML = '';
    cell.classList.remove('X', 'O', 'win');
  }
  updatePlayerTurn();
}

function updatePlayerTurn() {
  const playerTurnElement = document.getElementById('player-turn');
  playerTurnElement.innerHTML = `Player ${currentPlayer}'s Turn`;
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.innerHTML = `Score - Player X: ${score['X']} | Player O: ${score['O']}`;
}

function isBoardFull() {
  for (let cell of cells) {
    if (cell.innerHTML === '') {
      return false;
    }
  }
  return true;
}

function makeAIMove() {
  if (!gameOver) {
    let emptyCells = [];
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML === '') {
        emptyCells.push(i);
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      handleClick(emptyCells[randomIndex]);
    }
  }
}

function handleModeChange() {
  const modeOptions = document.getElementsByName('mode');
  for (let option of modeOptions) {
    if (option.checked) {
      mode = option.value;
      break;
    }
  }
  resetBoard();
}

function initializeGame() {
  updatePlayerTurn();
  updateScore();
}

initializeGame();