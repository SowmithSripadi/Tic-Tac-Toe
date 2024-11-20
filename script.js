const cells = document.querySelectorAll("[data-item]");
const board = document.querySelector(".board");
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winningTextMsg = document.querySelector("[data-winning-msg]");
const winningMsgElement = document.querySelector(".winning-message");
const restartButton = document.querySelector(".restart");
const darkModeToggle = document.querySelector("#dark-mode-toggle");
const whoseTurnText = document.querySelector(".whoseTurn");

const X = "x";
const O = "o";
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);
darkModeToggle.addEventListener("change", toggleDarkMode);

function startGame() {
  circleTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove(X);
    cell.classList.remove(O);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  hoverMarkerDisplay();
  winningMsgElement.classList.remove("show");
  whoseTurnText.textContent = "Player X's Turn";
}

function handleClick(e) {
  const cell = e.target;
  const currentPlayer = circleTurn ? O : X;

  placeMarker(currentPlayer, cell);

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchPlayer();
    hoverMarkerDisplay();
  }
}

function hoverMarkerDisplay() {
  board.classList.remove(O);
  board.classList.remove(X);

  if (circleTurn) {
    board.classList.add(O);
    whoseTurnText.textContent = "Player O's Turn";
  } else {
    board.classList.add(X);
    whoseTurnText.textContent = "Player X's Turn";
  }
}

function placeMarker(currentPlayer, cell) {
  cell.classList.add(currentPlayer);
}

function checkWin(currentPlayer) {
  return winning_combinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningTextMsg.textContent = "Draw!";
  } else {
    winningTextMsg.textContent = `${circleTurn ? "O" : "X"} Wins!`;
  }
  winningMsgElement.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(O) || cell.classList.contains(X);
  });
}

function switchPlayer() {
  circleTurn = !circleTurn;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
