/**
 * Factory Functions (Constructors)
 */
const Player = (name, score, symbol, playerCode) => {
  // Get name
  const getName = () => name;
  const getScore = () => score;
  const getSymbol = () => symbol;
  const getPlayerCode = () => playerCode;
  // Keep track of the score
  const updateScore = () => {
    score += 1;
  }
  // Public elements
  return {getName, getScore, getSymbol, getPlayerCode, updateScore};
}


/**
 * Module Functions
 */
const boardStatus = (() => {
  // DOM elements
  let board = document.getElementById('board');
  const playerOneCard = document.getElementById('player1-card');
  const playerOneIcon = document.getElementById('player1-icon');
  const playerOneTag = document.getElementById('player1-tagname');
  const playerOneScore = document.getElementById('p1-score');
  const playerTwoCard = document.getElementById('player2-card');
  const playerTwoIcon = document.getElementById('player2-icon');
  const playerTwoTag = document.getElementById('player2-tagname');
  const playerTwoScore = document.getElementById('p2-score');

  // Board players record movements
  let boardPlayer1 = ['', '', '',
                      '', '', '',
                      '', '', ''];
  let boardPlayer2 = ['', '', '',
                      '', '', '',
                      '', '', ''];
  // Win states
  const winStates = [
    // horizontal
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // vertical
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    // diagonal
    [1, 5, 9],
    [3, 5, 7],
  ]

  // Player board information
  // Player icon
  const _displayPlayerIcon = (player) => {
    console.log(player.getName());
    console.log(player.getSymbol()[0]);
    if (player.getPlayerCode() == 1) {
      playerOneIcon.innerHTML = `<span class="symbol material-symbols-rounded">${player.getSymbol()}</span>`
    }
    else {
      playerTwoIcon.innerHTML = `<span class="symbol material-symbols-rounded">${player.getSymbol()}</span>`
    }

  }
  // player tagname
  const _displayPlayerTagname = (player) => {
    if (player.getPlayerCode() == 1) {
      playerOneTag.textContent = player.getName()
    }
    else if (player.getPlayerCode() == 2) {
      playerTwoTag.textContent = player.getName()
    }
    else {
      playerTwoTag.textContent = 'AI';
    }
  }
  // players score
  const _displayPlayerScore = (player) => {
    console.log(player.getScore());
    if (player.getPlayerCode() == 1) {
      playerOneScore.innerHTML = player.getScore();
    }
    else {
      playerTwoScore.innerHTML = player.getScore();
    }
  }
  // Check if exist a winner status
  const _checkWinner = (player) => {
    // Check if player 1 has winner states
    if (player.getPlayerCode() == 1) {
      // Check every state
      for (let i = 0; i < winStates.length; i++) {
        let counter = 0;
        // Check every element in the state
        for (let j = 0; j < winStates[0].length; j++) {
          // increase counter everytime a number in the given state is found
          if (boardPlayer1.includes(`${winStates[i][j]}`)) {
            counter++;
          }
          // If the 3 elements exist the we have a winner state
          if (counter == 3) {
            return [player.getPlayerCode(), winStates[i]];
          }
        }
      }
    }
    // Check if player 2 has winner states
    else {
      // Check every state
      for (let i = 0; i < winStates.length; i++) {
        let counter = 0;
        // Check every element in the state
        for (let j = 0; j < winStates[0].length; j++) {
          // increase counter everytime a number in the given state is found
          if (boardPlayer2.includes(`${winStates[i][j]}`)) {
            counter++;
          }
          // If the 3 elements exist the we have a winner state
          if (counter == 3) {
            return [player.getPlayerCode(), winStates[i]];
          }
        }
      }
    }
    return -1;
  }

  const _declareWinner = (event, player, arr) => {
    const cells = document.getElementsByClassName('cell');
    // add winner style only to winner cells
    for (let i = 0; i < cells.length; i++) {
      if (arr.includes(Number(cells[i].id[4]))) {
        cells[i].classList.add('cell-winner');
      }
    }
  }

  // Clear / Reset Board
  const clear = () => {
    // Clear Board array
    for (let i = 0; i < boardPlayer1.length; i++) {
      boardPlayer1[i] = '';
      boardPlayer2[i] = '';
    }
    console.log(boardPlayer1);
    console.log(boardPlayer2);
    // Clear screen
    board.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      board.innerHTML += `<div onclick="gameStatus.update(event)" class="cell cell-free" id="cell${i}">
                            <span class="symbol material-symbols-rounded"></span>
                          </div>`
    }
  }
  // Color player card when its turn
  const indicatePlayerTurn = (a) => {
    if (!(a%2)) {
      playerOneCard.classList.add('current-turn');
      playerTwoCard.classList.remove('current-turn');
    }
    else {
      playerOneCard.classList.remove('current-turn');
      playerTwoCard.classList.add('current-turn');
    }
  }
  // Display players info status
  const displayPlayersInfo = (p1, p2) => {
    _displayPlayerIcon(p1);
    _displayPlayerIcon(p2);
    _displayPlayerTagname(p1);
    _displayPlayerTagname(p2);
    _displayPlayerScore(p1);
    _displayPlayerScore(p2);
  }
  // Add symbol user when cell clicked
  const addSymbol = (event, player) => {
    // When the clicked cell is free
    if (Array.from(event.target.classList).includes('cell-free')) {
      console.log('Cell position:', event.target.id[4]);
      console.log('Player code:', player.getPlayerCode());
      // Add the symbol position to the current player board
      if (player.getPlayerCode() == 1) {
        boardPlayer1[event.target.id[4]-1] = event.target.id[4];
        console.log(boardPlayer1);
      }
      else {
        boardPlayer2[event.target.id[4]-1] = event.target.id[4];
        console.log(boardPlayer2);
      }
      // Add current player symbol
      event.target.innerHTML = `<span class="symbol material-symbols-rounded">${player.getSymbol()}</span>`
      event.target.classList.remove('cell-free');
    }
  }
  const finishGame = (event, player) => {
    results = _checkWinner(player);
    console.log(results);
    if (results[0] > 0) {
      _declareWinner(event, player, results[1]);
    }
    else {
      console.log("Not winner yet");
    }
  }

  // Public elements
  return {
    clear,
    displayPlayersInfo,
    addSymbol,
    indicatePlayerTurn,
    finishGame,
  };
})();


// Handle all the game flow general changes
const gameStatus = (() => {
  // DOM elements
  const startScreen = document.getElementById('start-screen');
  const mainScreen = document.getElementById('main-screen');

  // Game status options
  const statusOpts = ['start-new-game', 'start-new-round', 'currently-playing'];
  // Game initial status variables
  let gameVars = {
    status: statusOpts[0],
    currentTurn: 0,
    currentGame: 0,
    currentPlayers: [],
  }
  
  // Screen Display
  const _hideStartScreen = () => {
    startScreen.classList.add('no-display');
  }
  const _displayMainScreen = () => {
    mainScreen.classList.remove('no-display');
  }

  // Symbols selection
  const _symbolSelection = (secondPlayer) => {
    // Full list of available symbols
    arr = ['close', 'favorite', 'circle', 'star', 'square', 'sunny', 'bedtime'];
    // First player symbol
    const symbol1 = arr.splice(Math.floor(Math.random()*arr.length), 1);
    // Second player symbol
    if (secondPlayer == 10) {
        var symbol2 = 'smart_toy';
    } else {
        symbol2 = arr.splice(Math.floor(Math.random()*arr.length), 1)
    }
    // Return those symbol in a list
    return [symbol1, symbol2];
  }

  // Check if user choose AI
  const _vsMachine = (p) => {
    for (let i = 0; i < p.length; i++)
    {
      if (p[i].id == 'ai-btn') {
        // second player ai code
        return 10;
      }
    }
    // second player human code
    return 2;
  }

  // Start a new game
  const _init = (event) => {
    // Check if second playe is machine or human
    const secondPlayerCode = _vsMachine(event.path);
    // Set symbols
    const symbolsList = _symbolSelection(secondPlayerCode);
    // Set players
    let p1 = Player('Player One', 0, symbolsList[0], 1);
    let p2 = Player('Player Two', 0, symbolsList[1], secondPlayerCode);
    // Set board
    boardStatus.clear()
    // Display Initial User Information
    boardStatus.indicatePlayerTurn(gameVars.currentGame + gameVars.currentTurn);
    boardStatus.displayPlayersInfo(p1, p2);
    // Display game screen
    _hideStartScreen();
    _displayMainScreen();
    return [p1, p2];
  }

  const update = (event) => {
    // Start a new game
    if (gameVars.status == statusOpts[0]) {
      gameVars.currentPlayers = _init(event);
      gameVars.status = statusOpts[2];
    }
    
    // Current game updates
    else if (gameVars.status == statusOpts[2] && Array.from(event.target.classList).includes('cell-free') ) {
      if (!(gameVars.currentGame + gameVars.currentTurn%2)) {
        boardStatus.addSymbol(event, gameVars.currentPlayers[0]);
        boardStatus.finishGame(event, gameVars.currentPlayers[0]);
      }
      else {
        boardStatus.addSymbol(event, gameVars.currentPlayers[1]);
        boardStatus.finishGame(event, gameVars.currentPlayers[1]);
      }
      gameVars.currentTurn += 1;
      // color current player card
      boardStatus.indicatePlayerTurn(gameVars.currentGame + gameVars.currentTurn);
    }
  }

  // Public Elements
  return {update}; 
})();


/**
 * DOM events
 */
// get DOM elements
const choiceBtn = document.getElementsByClassName('choice-btn');

// Add event listeners to every item
for (let i = 0; i  < choiceBtn.length; i++){
  choiceBtn[i].addEventListener('click', gameStatus.update);
}