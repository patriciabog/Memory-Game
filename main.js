'use strict';
//with document html
let movementsShow = document.querySelector('#movements');
let correctShow = document.querySelector('#correct');
let timeShow = document.querySelector('#t-rest');


let cardTurned = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let corrects = 0;
let timer = false;
let time = 60;
let timeInitial = time;
let timeRegressionId = null;

//Sounds
let clickSound = new Audio('./sounds/click.wav');
let loseSound = new Audio('./sounds/lose.wav');
let winSound = new Audio('./sounds/win.wav');
let wrongSound = new Audio('./sounds/wrong.wav');
let correctSound = new Audio('./sounds/correct.wav');

// Generate random numbers
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

//Funtion random
numbers = numbers.sort(()=>{return Math.random() -0.3});
console.log(numbers);

//Function counter time
function counterTime(){
   timeRegressionId = setInterval(()=> {
      time--;
      timeShow.innerHTML = `🕐 Time left: ${Math.max(0,time)} seconds`;

      if (time <= 0) {
        clearInterval(timeRegressionId);
        timeShow.innerHTML = `🕐 Time left: 0 seconds`;
        blockCards();
        loseSound.play();
      }
    },1000);
}

//Function stop showing cards
   function blockCards() {
        for (let i = 0; i <=15; i++){
          let cardBlocked = document.querySelector(`#button${i}`);
            cardBlocked.innerHTML = `<img src="./images/${numbers[i]}.png" alt="">`;
            cardBlocked.disabled = true;
        }

    }

//Function click and turn card
function turn(id){
    //when click the button start the counter
    if(timer == false){
     counterTime();
     timer = true;
    }
    cardTurned++;
    //console.log(cardTurned);

    if(cardTurned == 1){
        //show the first number
        card1 = document.querySelector(`#button${id}`);
        firstResult = numbers[id];
        card1.innerHTML = `<img src="./images/${firstResult}.png" alt="">`;
        clickSound.play();
        //block the button 
        card1.disabled = true;

    }else if(cardTurned == 2){
      card2 = document.querySelector(`#button${id}`);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="./images/${secondResult}.png" alt="">`;
        card2.disabled = true;
        //Counter movements increment
        movements++;
        movementsShow.innerHTML = `📲 Number of moves: ${movements}`;
        if(firstResult == secondResult){
            //Counter cards opened
            cardTurned = 0;
            //Counter increase hits
         corrects++;
         correctShow.innerHTML = `👍 Corrects: ${corrects}`;
         correctSound.play();

         }else{
            wrongSound.play();
            //Show the result 
            setTimeout(()=>{
                card1.innerHTML = '';
                card2.innerHTML = '';
                card1.disabled = false;
                card2.disabled = false;
                cardTurned = 0;
        },800);
        }

         if(corrects == 8) {
            clearInterval(timeRegressionId);
            correctShow.innerHTML = `👍 Corrects: ${corrects} 🎯`;
            timeShow.innerHTML = `🕐 Fantastic! you did in only ${timeInitial-time} seconds`;
            movementsShow.innerHTML = `📲 Number of moves: ${movements} 😎`;
             winSound.play();
          
         }
        
    }
}
//Function Reset

function resetGame() {
  // Reset all variables to their initial values
  cardTurned = 0;
  card1 = null;
  card2 = null;
  firstResult = null;
  secondResult = null;
  movements = 0;
  corrects = 0;
  timer = false;
  time = 60;
  timeInitial = time;

  // Reset the display elements in the HTML
  movementsShow.innerHTML = `Movements: ${movements}`;
  correctShow.innerHTML = `Corrects: ${corrects}`;
  timeShow.innerHTML = `Time left: ${time} seconds`;

   // Reset cards to their initial state
  for (let i = 0; i <= 15; i++) {
    let card = document.querySelector(`#button${i}`);
    card.innerHTML = '';
    card.disabled = false;
  }

  // Reset the timer if it is running
  clearInterval(timeRegressionId);

  // Restart the game by calling the initial function
  startGame();
}