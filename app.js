/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
  round_score,
  active_player,
  game_playing,
  previous_dice1,
  previous_dice2,
  winning_score;

init();

function next_player() {
  active_player === 0 ? (active_player = 1) : (active_player = 0);

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  round_score = 0;

  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

function roll() {
  if (game_playing) {
    var dice1DOM = document.querySelector(".dice1");
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice1DOM.style.display = "block";
    dice1DOM.src = "/images/dice-" + dice1 + ".png";

    var dice2DOM = document.querySelector(".dice2");
    dice2 = Math.floor(Math.random() * 6) + 1;
    dice2DOM.style.display = "block";
    dice2DOM.src = "/images/dice-" + dice2 + ".png";

    if (dice1 !== 1 && dice2 !== 1) {
      round_score += dice1 + dice2;
      document.querySelector(
        "#current-" + active_player
      ).textContent = round_score;

      if (
        (previous_dice1 === 6 && dice1 === 6) ||
        (previous_dice2 === 6 && dice2 === 6) ||
        (previous_dice1 === 6 && dice2 === 6) ||
        (previous_dice2 === 6 && dice1 === 6) ||
        (dice2 === 6 && dice1 === 6)
      ) {
        scores[active_player] = 0;
        document.getElementById("score-" + active_player).textContent = 0;
        next_player();
        previous_dice1 = 0;
        previous_dice2 = 0;
        alert(
          "OOPs Player " + (active_player + 1) + " got two consecutive six's"
        );
      }
    } else {
      next_player();
    }
    previous_dice1 = dice1;
    previous_dice2 = dice2;
  }
}

function hold() {
  if (game_playing) {
    scores[active_player] += round_score;

    document.getElementById("score-" + active_player).textContent =
      scores[active_player];

    if (scores[active_player] >= winning_score) {
      document.querySelector("#name-" + active_player).textContent = "WINNER!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document
        .querySelector(".player-" + active_player + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + active_player + "-panel")
        .classList.remove("active");

      game_playing = false;
    } else {
      next_player();
    }
  }
}

function init() {
  scores = [0, 0];
  active_player = 0;
  round_score = 0;
  game_playing = true;
  previous_dice1 = 0;
  previous_dice2 = 0;
  winning_score = parseInt(prompt("Set the Winning-Score."));
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".btn-roll").addEventListener("click", roll);

document.querySelector(".btn-hold").addEventListener("click", hold);

document.querySelector(".btn-new").addEventListener("click", init);
