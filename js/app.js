/*
 * Create a list that holds all of your cards
 */

 
const cardList = Array.from(document.querySelectorAll('.card'));

const deck = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


function shuffleSuit() {
    let shuffledSuit = shuffle(cardList);
    for (card of shuffledSuit) {
        if (card.className === "card open show") {
            card.classList.toggle('open');
            card.classList.toggle('show');
        }else{
            if (card.className === "card match") {
                card.classList.toggle('match');
            }
        } 
        deck.appendChild(card);
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffleSuit();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 */

/*
 * the deck element is the ancestor of the cards; using event delegation,
 * the eventListener attaches to each card
 * the eventListener's function that fires when a card is clicked is displayCard()
 
*/

deck.addEventListener('click', displayCard, false);

// limit to two at a time the cards that can be clicked


function displayCard(e) {
    var clickedItem = e.target;
    if (clickedItem !== e.currentTarget &&
       loggedCard.length < 2 &&
        clickedItem !== loggedCard[0]) {
            openCard(clickedItem);
            logOpenCard(clickedItem);  // this function records the cards that have been clicked
   }
}

function openCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

/*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 */

let loggedCard = []; // this will hold the cards that have been clicked

/*
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 */

let match = 0;
let time = 0;
let min = 0;
let sec = 0;
let timerOn = false;
let finalTime;
let timeLapse=setInterval(startTimer,1000);

restartGame();

function restartGame() {
    match = 0;
    shuffleSuit();
}

function logOpenCard(card) {
    loggedCard.push(card);
    if (loggedCard.length == 2) {
        checkMatch(loggedCard);
    }
}

/*  function checkMatch() - definition of function that checks if the two clicked cards match
 *      - if cards match:
 *        1) their "match", "open" and "show" properties are toggled so that they they remain face up and  
 *        no longer clickable
 *        2) the variable match is incremented (there are only a maximum lf 8 matches to end the game)
 *      - if the cards do not match:
 *        the openCard() function is executed after a delay of 1 second
 *      - whether the cards match or not, the loggedCard array is emptied
 *      - if the value of match equals 8, the game is ended, another function is executed for this purpose
 *        (endGame() is not yet available)
 */

function checkMatch() {
    if (
        loggedCard[0].firstElementChild.className ==
        loggedCard[1].firstElementChild.className
    ) {
        loggedCard[0].classList.toggle('match');
        loggedCard[1].classList.toggle('match');
        openCard(loggedCard[0]);
        openCard(loggedCard[1]);
        match++;
       }
    else {
        setTimeout(openCard.bind(null,loggedCard[0]), 1000);
        setTimeout(openCard.bind(null,loggedCard[1]), 1000);
    }
    loggedCard=[];
    addMove();
    if (match == 8) {
        endGame();
    }
}

/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 */

let move = 0;

/*    (I combined the incrementor and display in one function - addMove())
 *    the appropriate location to execute this is after clicking two cards 
 *    (a move should be equivalent to clicking a pair of cards)
 */

function addMove() {
    move++;
    document.querySelector('.moves').textContent = move;
}

function startTimer() {
    timerOn = true;
    time++;
    min = Math.floor(time/60);
    sec = time%60;
    if (sec < 10) {
        document.querySelector('.clock').textContent=`${min}:0${sec}`;
    } else {
        document.querySelector('.clock').textContent=`${min}:${sec}`;
    }
    finalTime=document.querySelector('.clock').textContent;
}

function stopTimer() {
    clearInterval(timeLapse);
    document.querySelector('.clock').textContent=finalTime;
    timerOn = false;
}

/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */