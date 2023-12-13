const score = JSON.parse(localStorage.getItem('score')) || {
  looses: 0,
  wins: 0,
  ties: 0
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  })

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  })

document.querySelector('.js-reset')
  .addEventListener('click', () => {
    confirmResult();
  })

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  })

  function confirmResult() {
    document.querySelector('.js-show-confirm-result').innerHTML = 
  `
    Are you want to Result Score?
    <button class="js-button-yes js-confirm-button" onclick="
      score.looses = 0;
      score.wins = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScore();
      hikeConfirmResult();
    ">Yes</button>

    <button class="js-button-no js-confirm-button" onclick="
      hikeConfirmResult();
    ">No</button>
  `;
  }
  
  function hikeConfirmResult() {
    document.querySelector('.js-show-confirm-result').innerHTML = '';
  }


  let isAutoPlaying = false;
  let intervalID;
function autoPlay() {
  if (!isAutoPlaying){
    intervalID = setInterval(() => {
      const autoPLayerMove = randomComputerMove();
      playGame(autoPLayerMove);
    },2000
    )
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    isAutoPlaying = true;
  }  else { 
    clearInterval(intervalID);
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Playing';
    isAutoPlaying = false;
  }

  console.log(isAutoPlaying);
}

function randomComputerMove() {
  const random = Math.random();
  let computerMove = '';

  if ( random >= 0 && random < 1/3) {
    computerMove = 'rock';
  } else if ( random > 1/3 && random < 2/3) {
    computerMove = 'paper';
  } else if ( random > 2/3 && random < 1 ) {
    computerMove = 'scissors';
  }
  return computerMove;
}

function playGame(playerMove) {
  
  let result = '';
  const computerMove = randomComputerMove();

  if ( playerMove === 'rock' ) {
    if ( computerMove === 'rock' ) {
      result = 'Tie.';
    } else if ( computerMove === 'paper' ) {
      result = 'You lose.';
    } else if ( computerMove === 'scissors' ) { 
      result = 'You win.';
    }
  } else if ( playerMove === 'paper' ) { 
    if ( computerMove === 'rock' ) {
      result = 'You win.'; 
    } else if ( computerMove === 'paper' ) {
      result = 'Tie.';
    } else if ( computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if ( playerMove === 'scissors' ){
    if ( computerMove === 'rock' ) {
      result = 'You lose.';
    } else if ( computerMove === 'paper' ) {
      result = 'You win.';
    } else if ( computerMove === 'scissors' ) {
      result = 'Tie.';
    }
  }

  if ( result === 'You lose.' ) {
    score.looses += 1;
  } else if ( result === 'You win.' ) {
    score.wins += 1;
  } else if ( result === 'Tie.') {
    score.ties += 1; 
  }
  updateScore();
  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-move').innerHTML = `You <img src="./image/${playerMove}-emoji.png" class="move-icon">  - <img src="./image/${computerMove}-emoji.png" class="move-icon"> Computer `;
  
  
  // alert(`You picked: ${playerMove}. Computer picked: ${computerMove}. Result: ${result}`);

  localStorage.setItem('score', JSON.stringify(score));
}

function updateScore() { 
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}- Ties: ${score.ties} - Looses: ${score.looses}`;
}
