/**
 * Factory Functions (Constructors)
 */
const Player = (name, score, symbol, playerCode) => {
  // Get name
  const getName = () => name;
  const getScore = () => score;
  const getSymbol = () => symbol;
  const getplayerCode = () => playerCode;

  // Keep track of the score
  const updateScore = x => {
    score += 1;
  }

  // Public elements
  return {getName, getScore, getSymbol, getplayerCode, updateScore};
}


/**
 * Module Functions
 */
const boardStatus = (() => {
  // DOM elements
  let board = document.getElementById('board');
  const playerOneIcon = document.getElementById('player1-icon');
  const playerOneTag = document.getElementById('player1-tagname');
  const playerOneScore = document.getElementById('p1-score');
  const playerTwoIcon = document.getElementById('player2-icon');
  const playerTwoTag = document.getElementById('player2-tagname');
  const playerTwoScore = document.getElementById('p2-score');

  // Board status array
  let boardArray = ['', '', '',
                    '', '', '',
                    '', '', ''];

  // Player board information
  // Player icon
  const _displayPlayerIcon = (player) => {
    console.log(player.getName());
    console.log(player.getSymbol()[0]);
    if (player.getplayerCode() == 1) {
      playerOneIcon.innerHTML = `<span class="symbol material-symbols-rounded">${player.getSymbol()}</span>`
    }
    else {
      playerTwoIcon.innerHTML = `<span class="symbol material-symbols-rounded">${player.getSymbol()}</span>`
    }

  }
  // player tagname
  const _displayPlayerTagname = (player) => {
    if (player.getplayerCode() == 1) {
      playerOneTag.textContent = player.getName()
    }
    else if (player.getplayerCode() == 2) {
      playerTwoTag.textContent = player.getName()
    }
    else {
      playerTwoTag.textContent = 'AI';
    }
  }
  // players score
  const _displayPlayerScore = (player) => {
    console.log(player.getScore());
    if (player.getplayerCode() == 1) {
      playerOneScore.innerHTML = player.getScore();
    }
    else {
      playerTwoScore.innerHTML = player.getScore();
    }
  }

  // Clear / Reset Board
  const clear = () => {
    // Clear Board array
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i] = ''; 
    }
    console.log(boardArray);
    // Clear screen
    board.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      board.innerHTML += `<div onclick="boardStatus.addSymbol(event)" class="cell cell-free" id="cell${i}">
                            <span class="symbol material-symbols-rounded"></span>
                          </div>`
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
  const addSymbol = (event) => {
    console.log(event.target.classList);
    // When the clicked cell is free
    if (Array.from(event.target.classList).includes('cell-free')) {
      event.target.classList.remove('cell-free');
      // Add current player symbol
      event.target.innerHTML = '<span class="symbol material-symbols-rounded">favorite</span>'
    }
  }

  // Public elements
  return {clear, displayPlayersInfo, addSymbol};
})();


// Handle all the game flow general changes
const gameStatus = (() => {
  // DOM elements
  const startScreen = document.getElementById('start-screen');
  const mainScreen = document.getElementById('main-screen');
  
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
  const init = (event) => {
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
    boardStatus.displayPlayersInfo(p1, p2);
    // Display game screen
    _hideStartScreen();
    _displayMainScreen();
  }

  // Public Elements
  return {init}; 
})();


/**
 * DOM events
 */
// get DOM elements
const choiceBtn = document.getElementsByClassName('choice-btn');

// Add event listeners to every item
for (let i = 0; i  < choiceBtn.length; i++){
  choiceBtn[i].addEventListener('click', gameStatus.init);
}