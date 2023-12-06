const score = JSON.parse(localStorage.getItem('score')) || {
  looses: 0,
  wins: 0,
  ties: 0
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

  document.querySelector('.js-move').innerHTML = `You: ${playerMove} - Computer: ${computerMove}`;
  
  
  alert(`You picked: ${playerMove}. Computer picked: ${computerMove}. Result: ${result}`);

  localStorage.setItem('score', JSON.stringify(score));
}

function updateScore() { 
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}- Ties: ${score.ties} - Looses: ${score.looses}`;
}
