/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

//Roll dice btn function
document.querySelector(".btn-roll").addEventListener("click", () => {
       //make sure game is playing 
       if(gamePlaying) {
            //Generate Random Number
            var dice = Math.floor(Math.random() * 6 + 1);

            //'Paste' correct dice png to = random dice number generated ^
            var diceDom = document.querySelector(".dice");
            //unhide from from earlier
            diceDom.style.display = "block";
            //set img to dice
            diceDom.src = "dice-" + dice + ".png";

            //Update round score IF dice != 1
            if (dice !== 1) {
                //add score
                roundScore += dice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
       }  
});

document.querySelector(".btn-hold").addEventListener("click", () => {
    if(gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        //Get winning score from user input 
        var userScore = document.querySelector('.winScore').value;
        var winScore;
        
        //Check for user input by user tre or false
        if(userScore) {
            winScore = userScore;
        } else {
            winScore = 0;
        }

        //Check if player wins
        if (scores[activePlayer] >= winScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }   
});

function nextPlayer() {
    //Next Player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    //Sets other player score back to zero
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    //Toggles css class to show which player is active;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    //turns dice of when switching
    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //Set Dice png at the beginning of the game to off
    document.querySelector(".dice").style.display = "none";

    //Set Scores = 0 at the beginning of the game
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //Reset player names
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}