//Frozen Object for game modes (Immutable)
const playerMode = (() => {
  const mode = { singlePlayer: "singlePlayer", multiPlayer: "multiPlayer" };
  return Object.freeze(mode);
})();

//Gameboard (Module Pattern using IIFE)
const gameboard = (() => {
  const gameboardSquares = new Array(9);
  const winningGameArrangements = new Array()[
  [1,2,3],
  [1,4,7],
  [1,5,9],
  [2,5,8],
  [3,6,9],
  [3,5,7],
  [4,5,6]];
  return {
    gameboardSquares,
    winningGameArrangements,
  };
})();

//PlayerFacotry Pattern for multiple Players
const player = (name, team) => {
  let score = 0;
  const getName = () => name;
  const getTeam = () => team;
  const getScore = () => score;
  const playerWins = () => score + 1;
  const moves = () => moves;
  return {
    getName,
    getTeam,
    getScore,
    playerWins,
    moves,
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

  switch (gameModeChosen) {
    case playerMode.singlePlayer:
      playerOne = player("Player One", "x");
      playerTwo = computer("easy", "o");
      CheckForButtonSelection("single");
      break;
    case playerMode.multiPlayer:
      playerOne = player("Player One", "x");
      playerTwo = player("Player Two", "o");
      CheckForButtonSelection("multi");
      break;
    default:
      console.log("Game mode chosen is not valid.");
      break;
  }
};

function CheckForButtonSelection(selectedButton){
  const buttonSinglePlayer = document.querySelector("#singlePlayer");
  const buttonMutliPlayer = document.querySelector("#multiPlayer");

  if(selectedButton === "single" && !buttonMutliPlayer.classList.contains("selected")){
    buttonSinglePlayer.classList.toggle("selected");
  }else if (selectedButton === "multi" && !buttonSinglePlayer.classList.contains("selected")){
    buttonMutliPlayer.classList.toggle("selected");
  }else{
    buttonSinglePlayer.classList.toggle("selected");
    buttonMutliPlayer.classList.toggle("selected");
  }
};