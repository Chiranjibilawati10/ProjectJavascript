/**
 * in this game player need to guess the number
 * there are certain guess limit for the player 
 * the player will be notify regarding the guess remaining
 * after game over it provides play again option to the player
 *
 */

 //games value
 let min = 1, 
 max = 10, 
 winningNum = getRandomNum(min, max),
guessLeft =3;
 //UI elements 
 const game = document.querySelector('#game'),
       minNum = document.querySelector('.min-num'),
       maxNum = document.querySelector('.max-num'),
       guessBtn = document.querySelector('#guess-btn'),
       guessInput = document.querySelector('#guess-input'),
       message = document.querySelector('.message');

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//listen for the guess

guessBtn.addEventListener('click', function(){
    let guess =parseInt(guessInput.value);

    //validating the  guess
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }
    //check if won

    if(guess === winningNum){
        //gameover - own
        gameover(true, `${winningNum} is  correct, YOU WIN! `);
    }else {
        //wrong number
        guessLeft -= 1;

        if(guessLeft === 0){
            //game over lost
            gameover(false, `Game over - You lost.The correct number was ${winningNum} `);
            
        } else {
            //game continous - answer wrong
            //tell user the guess number is wrong and continue the game
            guessInput.style.borderColor = 'red';
            //clear input
            guessInput.value = '';
            setMessage(`${guess} is not correct, you have ${guessLeft} guesses left`,'red');
        }
    }
});

//game over

function gameover(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    //change the border
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;
    //set message
    setMessage(msg);

    //play again
    guessBtn.value = 'Play Again ';
    guessBtn.className += 'play-again';
}
//get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}
//set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}