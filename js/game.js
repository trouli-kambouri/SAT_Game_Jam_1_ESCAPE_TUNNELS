
// Timer

const STARTING_TIME = 10 * 60; // This is the amount of time that the timer is set to.
const INCORRECT_PENALTY = 10; // This is the 'time penalty' amount in seconds.

let timeRemaining = STARTING_TIME; // This sets the 'timeRemaining' to the amount left on the timer.
let currentPage = 0;
let timerInterval;


// References to HTML elements

const timerElement = document.getElementById("timer");

const pages = document.querySelectorAll(".game-page");

const correctButtons = document.querySelectorAll(".correct-button");
const incorrectButtons = document.querySelectorAll(".incorrect-button");

const winPlayAgainButton = document.getElementById("win-play-again");
const losePlayAgainButton = document.getElementById("lose-play-again");
const startGameButton = document.querySelector(".start-game-button");


// Timer

function updateTimer() 
{
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() 
{
    
    clearInterval(timerInterval); // Clear timer at start of each session
    timerInterval = setInterval(() => {

        timeRemaining--;
        updateTimer();
        if (timeRemaining <= 0) {   // IF timer has reached zero
            timeRemaining = 0;
            updateTimer();
            loseGame();
        }

    }, 1000);
}

function stopTimer() 
{
    clearInterval(timerInterval);
}


// TRANSITIONING FROM PAGE TO PAGE

function showPage(pageNumber) 
{
    // Hide every page
    pages.forEach(page => {
        page.classList.remove("active");
    });

    // Show the requested page
    const page = document.getElementById(`page-${pageNumber}`);

    page.classList.add("active");
}


function showWinPage() 
{
    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("win-page").classList.add("active");
}


function showLosePage() {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("lose-page").classList.add("active");
}


// ANSWERS

function correctAnswer() {

    // If we're on page X last page, the player has completed all five pages.
    if (currentPage === 5) {

        stopTimer();

        showWinPage();

        return;
    }

    // Otherwise, move to the next page
    currentPage++;

    showPage(currentPage);
}

function incorrectAnswer() {

    
    timeRemaining -= INCORRECT_PENALTY; // Remove 10 seconds

    if (timeRemaining < 0) { // Don't allow the timer to go below zero
        timeRemaining = 0;
    }

    updateTimer();

    if (timeRemaining === 0) {

        loseGame();
    }
}


function loseGame() { // Lose game

    stopTimer();

    showLosePage();
}


function startGame() { // Reset timer

    
    timeRemaining = STARTING_TIME;
    currentPage = 1;
    updateTimer();
    showPage(1);
    startTimer();
}


// Buttons

correctButtons.forEach(button => {

    button.addEventListener("click", correctAnswer);

});

incorrectButtons.forEach(button => {

    button.addEventListener("click", incorrectAnswer);

});

startGameButton.addEventListener("click", startGame);

// Play again from win screen
winPlayAgainButton.addEventListener("click", startGame);

// Play again from lose screen
losePlayAgainButton.addEventListener("click", startGame);


// Start the game

updateTimer();