const rockButton = document.querySelector('#RockButton');
const paperButton = document.querySelector('#PaperButton');
const scissorsButton = document.querySelector('#ScissorsButton');
const resetButton = document.querySelector('#ResetButton');

rockButton.onclick = onRockPressed;
paperButton.onclick = onPaperPressed;
scissorsButton.onclick = onScissorsPressed;
resetButton.onclick = newGame;

const scoreDisplay = document.querySelector('#ScoreDisplay');
const scoreNumbers = document.querySelector('#ScoreNumbers')
const resultsText = document.querySelector('#ResultsText');

let playerScore = 0;
let computerScore = 0;

function computerPlay() {
    let n = Math.floor(Math.random() * 3)
    switch (n) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice == computerChoice) {
        return "It's a tie!"
    }

    switch (playerChoice) {
        case "rock":
            if (computerChoice == "paper") {
                computerScore += 1;
                return "You lost! Paper beats rock."
            }
            else {
                playerScore += 1;
                return "You won! Rock beats scissors."
            }
        case "paper":
            if (computerChoice == "scissors") {
                computerScore += 1;
                return "You lost! Scissors beats paper."
            }
            else {
                playerScore += 1;
                return "You won! Paper beats rock."
            }
        case "scissors":
            if (computerChoice == "rock") {
                computerScore += 1;
                return "You lost! Rock beats scissors."
            }
            else {
                playerScore += 1;
                return "You won! Scissors beats paper."
            }

    }
}

function onRockPressed() {
    resultsText.textContent = playRound("rock", computerPlay());
    resultsText.style.visibility = "visible";
    scoreNumbers.textContent = `${playerScore} : ${computerScore}`;
    if (playerScore == 5 || computerScore == 5) {
        endGame();
    }
}

function onPaperPressed() {
    resultsText.textContent = playRound("paper", computerPlay());
    resultsText.style.visibility = "visible";
    scoreNumbers.textContent = `${playerScore} : ${computerScore}`;
    if (playerScore == 5 || computerScore == 5) {
        endGame();
    }
}

function onScissorsPressed() {
    resultsText.textContent = playRound("scissors", computerPlay());
    resultsText.style.visibility = "visible";
    scoreNumbers.textContent = `${playerScore} : ${computerScore}`;
    if (playerScore == 5 || computerScore == 5) {
        endGame();
    }
}

function endGame() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;

    if (playerScore == 5) {
        resultsText.textContent = "You won! Congratulations!";
    }
    else {
        resultsText.textContent = "You lost! Better luck next time!";
    }
    resultsText.style.visibility = "visible";
}

function newGame() {
    playerScore = 0;
    computerScore = 0;
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;

    scoreNumbers.textContent = `${playerScore} : ${computerScore}`;
    resultsText.style.visibility = "hidden";
}

newGame();



/*function game() {
    playerScore = 0;
    computerScore = 0;

    for (let i = 0; i < 10; i++) {
        let input = prompt("What will you choose?");
        let playerChoice = input.toLowerCase();
        console.log(playRound(playerChoice, computerPlay()));
    }

    if (playerScore == computerScore) {
        return `Full game was a tie! Player Score: ${playerScore} Computer Score: ${computerScore}`
    }
    else if (playerScore > computerScore) {
        return `You won the game! Player Score: ${playerScore} Computer Score: ${computerScore}`
    }
    else {
        return `You lost the game! Player Score: ${playerScore} Computer Score: ${computerScore}`
    }
}*/

//console.log(game());

