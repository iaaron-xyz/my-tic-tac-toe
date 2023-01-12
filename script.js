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
        _hideStartScreen();
        _showMainScreen();
    }

    return {init}; 
})();


/**
 * DOM events
 */
// get DOM elements
const vsPlayer = document.getElementById('player-btn');
const vsAI = document.getElementById('ai-btn');

vsPlayer.addEventListener('click', gameStatus.init);
vsAI.addEventListener('click', gameStatus.init);