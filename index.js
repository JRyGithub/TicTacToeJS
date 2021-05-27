//Frozen Object for game modes (Immutable)
const playerMode = (() => {
  const mode = { singlePlayer: "singlePlayer", multiPlayer: "multiPlayer" };
  return Object.freeze(mode);
})();

//Gameboard (Module Pattern using IIFE)
const gameboard = (() => {
  const gameboardSquares = new Array(9);
  let playerTurn = "X";
  let turnDone = false;
  const winningGameArrangements = new Array(
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6]
  );
  return {
    gameboardSquares,
    winningGameArrangements,
    playerTurn,
    turnDone,
  };
})();

//PlayerFactory Pattern for multiple Players
const player = (name, team) => {
  let score = 0;
  let moves = new Array(5);
  let playerMove = 0;
  const getScore = () => score;
  const playerWins = () => score + 1;
  const move = (pmove) => {
    moves[playerMove] = pmove + 1;
    playerMove++;
  };
  return {
    name,
    team,
    getScore,
    playerWins,
    move,
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
      playerOne = player("Player One", "X");
      playerTwo = computer("easy", "O");
      CheckForButtonSelection("single");
      break;
    case playerMode.multiPlayer:
      playerOne = player("Player One", "X");
      playerTwo = player("Player Two", "O");
      CheckForButtonSelection("multi");
      gameStart(playerOne, playerTwo);
      break;
    default:
      console.log("Game mode chosen is not valid.");
      break;
  }
};

function CheckForButtonSelection(selectedButton) {
  const buttonSinglePlayer = document.querySelector("#singlePlayer");
  const buttonMutliPlayer = document.querySelector("#multiPlayer");

  if (
    selectedButton === "single" &&
    !buttonMutliPlayer.classList.contains("selected")
  ) {
    buttonSinglePlayer.classList.toggle("selected");
  } else if (
    selectedButton === "multi" &&
    !buttonSinglePlayer.classList.contains("selected")
  ) {
    buttonMutliPlayer.classList.toggle("selected");
  } else {
    buttonSinglePlayer.classList.toggle("selected");
    buttonMutliPlayer.classList.toggle("selected");
  }
}

//Game Start And Logic
const gameStart = (player1, player2) => {
  var blocks = document.getElementsByClassName("block");
  let gameMoves = 1;
  blocks = [...blocks];
  blocks.forEach((block) => {
    block.addEventListener(
      "click", function(){ BlockLogic(block, player1, player2, gameMoves); },{ once: true }
    );
  });
};

function BlockLogic(block, player1, player2, gameMoves){
        block.innerHTML = gameboard.playerTurn;
        var blockId = block.id;
        var blockNum = blockId.replace(/\D/g, "");
        blockNum = parseInt(blockNum);
        if (gameboard.playerTurn === player1.team) {
          player1.move(blockNum);
          gameMoves++;
          gameboard.playerTurn = player2.team;
          CheckForWinOrEnd(gameMoves, player1);
        } else {
          player2.move(blockNum);
          gameMoves++;
          gameboard.playerTurn = player1.team;
          CheckForWinOrEnd(gameMoves, player2);
        }
      }
//Checks for win or game over and calls reset game.
const CheckForWinOrEnd = (gameMoves, currentPlayer) => {
  let won = false;
  if (gameMoves > gameboard.gameboardSquares.length) {
    alert("Game Over");
  } else {
    gameboard.winningGameArrangements.forEach((winningPattern) => {
      winningPattern.every((x) => currentPlayer.moves.includes(x));
      if (winningPattern.every((x) => currentPlayer.moves.includes(x))) {
        won = true;
        console.log(currentPlayer.name + "wins!");
      }
    });
  }
  if(won){
    ResetGame();
  }
};

//Resets game
const ResetGame = () => {
  var blocks = document.getElementsByClassName("block");
  blocks = [...blocks];
  blocks.forEach((block) => {
    block.innerHTML = "";
    block.remove();
  });
  gameboard.playerTurn = "X";
  
  CreateNewGameBoard();

  var buttonsSelected = [...document.getElementsByClassName("selected")];
  console.log(buttonsSelected);
  buttonsSelected.forEach((button) => {
    console.log(button);
    button.classList.toggle("selected");
  })
}
const CreateNewGameBoard = () =>{
  const containerDiv = document.querySelector(".play-area");
  const ticTacToeSquares = 9;
  for(var i = 0; i<ticTacToeSquares; i++){
    var block = document.createElement('div');
    block.id= 'block_'+i;
    block.className= 'block';
    containerDiv.appendChild(block);
  }
}
