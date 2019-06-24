/*
 * Create a list that holds all of your cards
 */

// Add the font awesome classes for each symbol to an array of 16 items. These will be shuffled.
let cards = [
    "fa-diamond",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-anchor",
    "fa-bolt",
    "fa-bolt",
    "fa-cube",
    "fa-cube",
    "fa-leaf",
    "fa-leaf",
    "fa-bicycle",
    "fa-bicycle",
    "fa-bomb",
    "fa-bomb"];

let openCards = [];
let moveCounter = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function generateCardHTML() {
    return cards.map((card) => {
        return `<li class="card" data-name="${card}">
              <i class="fa ${card}"></i>
        </li>`;
    });
}

function showCard(card) {
    card.classList.add("show","open");
}

function lockMatchedCards() {
    if (openCards.length === 2) {
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        openCards.length = 0;
    }
}

function resetUnmatchedCards() {
    if (openCards.length === 2) {
        setTimeout(() => {
            openCards[0].classList.remove("open","show");
            openCards[1].classList.remove("open","show");
            openCards.length = 0;
        },1000);
    }
}

function incrementMoveCounter() {
    moveCounter++;
    document.getElementById("moves").innerText = moveCounter;
}

function addCardToOpenList(card) {
    openCards.push(card);

    // Do the cards match
    if (openCards.length === 2) {
        if (openCards[0].dataset.name === openCards[1].dataset.name) {
            // Yes they do.
            lockMatchedCards();
        } else {
            // No they don't
            resetUnmatchedCards();
        }
        incrementMoveCounter();
    }
}

function start() {

    openCards.length = 0;
    moveCounter = -1;
    incrementMoveCounter();

    // Shuffle the card array
    cards = shuffle(cards);

    // Generate HTML based on the cards array
    const generatedHTML = generateCardHTML().join('');

    // Append the generated <li> items to the deck
    const deckElement = document.getElementById("deck");
    deckElement.innerHTML = generatedHTML;

}

function init() {

    // Set the click event listener on the deck
    document.getElementById("deck").addEventListener("click", (e) => {
        if (e.target.classList.contains("card") && openCards.length < 2) {
            // Grab the card and flip it
            let card = e.target;
            showCard(card);
            addCardToOpenList(card);
        }
    });

    // Set the click listener for the restart element
    document.getElementById("restart").addEventListener("click", () => {
        start();
    });
}

init();
start();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
