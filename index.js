//Gameboard (Module Pattern using IIFE)
const gameboard = (() =>{
    const gameboardSquares = new Array[9];
    return {
        gameboardSquares
    };
})();

//PlayerFacotry Pattern for multiple Players
const player = (name, team) => {
    let score = 0;
    const getName = () => name;
    const getTeam = () => team;
    const getScore = ()  => score;
    const playerWins = () => score + 1;

    return {
        getName,
        getTeam,
        getScore,
        playerWins
    }
}