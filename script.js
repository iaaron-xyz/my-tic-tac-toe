/**
 * Factory Functions (Constructors)
 */
const Player = (name, score) => {
    // Get name
    const getName = () => name;
    const getScore = () => score;

    // Keep track of the score
    const updateScore = x => {
        score += 1;
    }

    return {getName, getScore, updateScore};
}


/**
 * Module Functions
 */
const boardStatus = (() => {
    // DOM elements
    let board = document.getElementById('board');

    // Clear / Reset Board
    const clear = () => {
        board.innerHTML = '';
        for (let i = 1; i <= 9; i++) {
            board.innerHTML += `<div onclick="gameStatus.addSymbol(event)" class="cell cell-free" id="cell${i}">
                                    <span class="symbol material-symbols-rounded"></span>
                                </div>`
        }
    }

    // Public elements
    return {clear};
})();

const gameStatus = (() => {
    // DOM elements
    const startScreen = document.getElementById('start-screen');
    const mainScreen = document.getElementById('main-screen');
    
    // Internal functions
    const _hideStartScreen = () => {
        startScreen.classList.add('no-display');
    }
    const _showMainScreen = () => {
        mainScreen.classList.remove('no-display');
    }

    // Functions to return
    const init = () => {
        // Init game screen
        _hideStartScreen();
        _showMainScreen();
        // Set players

        // Set board
        boardStatus.clear()
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

    // Public Elements
    return {init, addSymbol}; 
})();


/**
 * DOM events
 */
// get DOM elements
const vsPlayer = document.getElementById('player-btn');
const vsAI = document.getElementById('ai-btn');

vsPlayer.addEventListener('click', gameStatus.init);
vsAI.addEventListener('click', gameStatus.init);