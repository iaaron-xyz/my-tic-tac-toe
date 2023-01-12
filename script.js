/**
 * Factory Functions (Constructors)
 */
const Player = (name, score, symbol, playerNumber) => {
    // Get name
    const getName = () => name;
    const getScore = () => score;
    const getSymbol = () => symbol;
    const getPlayerNumber = () => playerNumber;

    // Keep track of the score
    const updateScore = x => {
        score += 1;
    }

    // Public elements
    return {getName, getScore, getSymbol, getPlayerNumber, updateScore};
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

    // Player board information
    // Player icon
    const _displayPlayerIcon = (player) => {
        console.log(player.getName());
        console.log(player.getSymbol()[0]);
        if (player.getPlayerNumber() == 1) {
            playerOneIcon.innerHTML = `<span class="symbol material-symbols-rounded">${player.getSymbol()}</span>`
        }
        else if (player.getPlayerNumber() == 2) {
            playerTwoIcon.innerHTML = `<span class="symbol material-symbols-rounded">${player.getSymbol()}</span>`
        }

    }
    // player tagname
    const _displayPlayerTagname = (player) => {
        if (player.getPlayerNumber() == 1) {
            playerOneTag.innerHTML = player.getName()
        }
        else if (player.getPlayerNumber() == 2) {
            playerTwoTag.innerHTML = player.getName()
        }
    }
    // players score
    const _displayPlayerScore = (player) => {
        console.log(player.getScore());
        if (player.getPlayerNumber() == 1) {
            playerOneScore.innerHTML = player.getScore();
        }
        else if (player.getPlayerNumber() == 2) {
            playerTwoScore.innerHTML = player.getScore();
        }
    }

    // Clear / Reset Board
    const clear = () => {
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
    const _symbolSelection = () => {
        // Full list of available symbols
        arr = ['close', 'favorite', 'circle', 'star', 'square', 'sunny', 'bedtime'];
        // Pick two different symbols
        const symbol1 = arr.splice(Math.floor(Math.random()*arr.length), 1);
        const symbol2 = arr.splice(Math.floor(Math.random()*arr.length), 1)
        // Return those symbol in a list
        return [symbol1, symbol2];
    }


    // Start a new game
    const init = () => {
        // Set symbols
        const symbolsList = _symbolSelection();
        // Set players
        let p1 = Player('Player One', 0, symbolsList[0], 1);
        let p2 = Player('Player Two', 0, symbolsList[1], 2)
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