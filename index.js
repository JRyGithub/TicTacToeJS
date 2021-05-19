//Frozen Object for game modes (Immutable)
const playerMode = (() => {
  const mode = { singlePlayer: "singlePlayer", multiPlayer: "multiPlayer" };
  return Object.freeze(mode);
})();

//Gameboard (Module Pattern using IIFE)
const gameboard = (() => {
  const gameboardSquares = new Array(9);
  return {
    gameboardSquares,
  };
})();

//PlayerFacotry Pattern for multiple Players
const player = (name, team) => {
  let score = 0;
  const getName = () => name;
  const getTeam = () => team;
  const getScore = () => score;
  const playerWins = () => score + 1;

  return {
    getName,
    getTeam,
    getScore,
    playerWins,
  };
};

const computer = (difficulty, team) => {
  const computerPlayer = player("Computer", team);
  const getDifficulty = () => difficulty;
  return {
    computerPlayer,
    difficulty,
  };
};
//Select Game Mode Button Handleer
const oneOrTwoPlayer = (singleOrMulti) => {
  const playerModeChosen = singleOrMulti.id;
  game(playerModeChosen);
};

//GameModeChoice and Player Set Up
const game = (gameModeChosen) => {
  let playerOne;
  let playerTwo;

  const buttonSinglePlayer = document.querySelector("#singlePlayer");
  const buttonMutliPlayer = document.querySelector("#multiPlayer");

  switch (gameModeChosen) {
    case playerMode.singlePlayer:
      playerOne = player("Player One", "x");
      playerTwo = computer("easy", "o");
      CheckForButtonSelection("single");
      buttonSinglePlayer.classList.toggle("selected");
      break;
    case playerMode.multiPlayer:
      playerOne = player("Player One", "x");
      playerTwo = player("Player Two", "o");
      CheckForButtonSelection("multi");
      buttonMutliPlayer.classList.toggle("selected");
      console.log("MultiPlayer");
      break;
    default:
      console.log("Game mode chosen is not valid.");
      break;
  }
};

function CheckForButtonSelection(selectedButton){

};