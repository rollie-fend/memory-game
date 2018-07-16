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



function logOpenCard(card) {

    loggedCard.push(card);

}

/*
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
