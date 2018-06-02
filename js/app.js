/*
 * Create a list that holds all of your cards
 */
const original = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];
const array = original.concat(original);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/**
 * @description Shuffle function from http://stackoverflow.com/a/2450976
 * @constructor
 * @param {Array} array - a list of cards
 * @returns {Array} array - a 'new' list of cards
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/**
 * @description Create HTML for list of cards
 * @constructor
 * @param {Array} array
 * @returns {Array} list - constructed each card's HTML
 */
function makeUL(array) {
    // Create the list element
    const list = document.createElement('ul');
    // Add a class and id to the list element
    list.classList.add('deck');
    list.setAttribute('id', 'deck');

    for (let i = 0; i < array.length; i++) {
        // Create the list item
        const item = document.createElement('li');
        // Add a class to a list item
        item.classList.add('card');
        // Create the icon
        const icon = document.createElement('i');
        // Add a class to an icon by get it from shuffleArray
        icon.setAttribute('class', array[i]);
        // Append an icon to a list item
        item.appendChild(icon);
        // Add a list item to list(ul)
        list.appendChild(item);
    }
    return list;
}

/*
 * Create a 'new' list that holds all of cards
 */
let shuffleArray = shuffle(array);

/*
 * Add a new list of card' HTML to the page
 */
document.querySelector('div').appendChild(makeUL(shuffleArray));

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

/*
 * Create an array that collects the list of opened card
 */
let listOpenedCard = [];

/*
 * Create a boolean that holds 'has been start timer yet?'
 */
let isTimeCount = false;

/*
 * Create a current number of moves a user has made.
 */
let moveCounter = 0;

/*
 * Create a string to stores the setInterval's function. After that it will use to clearInterval. 
 */
let timer = null;

/*
 * Create a number of star rating
 */
let star = 0;

/**
 * @description Display the card's symbol
 * @param {Object} Event object
 */
function flipCard(evt) {
    // when flip the card at the first time, then start the timer
    if (!isTimeCount) {
        startTimer();
        // set a value is True for run timer continuously
        isTimeCount = true;
    }

    //Display a card's symbol and remove the event listener of its card
    evt.target.classList.remove('flip-card');
    evt.target.classList.add('open', 'show', 'flip-card');
    // remove the click event at the target so that the program will not collects all of info about it
    evt.target.removeEventListener(evt.type, flipCard);

    addListOpenCard(evt);
}

/**
 * @description Add a opened card to the array
 * @param {Object} Event object
 */
function addListOpenCard(evt) {
    if (evt.target.classList.contains('open')) {
        let openedCard = evt.target;
        listOpenedCard.push(openedCard);
    }

    // check the number of cards in the array, if it already has another card then check if the two cards match
    if (listOpenedCard.length % 2 === 0) {
        checkMatch();
        // start to increment a number of moves
        counter();
        // all card have matched
        checkFinish();
    }
}

/**
 * @description Get the value of a previous card and a current card the check the two cards match
 */
function checkMatch() {
    let listOpenedCardLength = listOpenedCard.length;
    // get the value of a previous card in the array
    let previousCard = listOpenedCard[listOpenedCardLength - 2];
    let iconPreviousCard = previousCard.firstElementChild.classList.value;
    // get the value of a current card in the array
    let currentCard = listOpenedCard[listOpenedCardLength - 1];
    let iconCurrentCard = currentCard.firstElementChild.classList.value;

    // compare the two values
    if (iconPreviousCard === iconCurrentCard) {
        matched(previousCard, currentCard);
    } else {
        notMatched(previousCard, currentCard);
    }
}

/**
 * @description The cards do match, the cards stay the open position
 * @param {string} a - the element of a previous card
 * @param {string} b - the element of a current card
 */
function matched(a, b) {
    a.classList.add('match');
    b.classList.add('match');
}

/**
 * @description The cards do not match, hide the card's symbol, remove the cards from the list and add cilck event to them
 * @param {string} a - the element of a previous card
 * @param {string} b - the element of a current card
 */
function notMatched(a, b) {
    a.classList.add('nomatch', 'flip-card');
    b.classList.add('nomatch', 'flip-card');

    setTimeout(function() {
        a.classList.remove('open', 'show', 'nomatch');
        b.classList.remove('open', 'show', 'nomatch');
    }, 1000);

    a.addEventListener('click', flipCard);
    b.addEventListener('click', flipCard);
    listOpenedCard.pop();
    listOpenedCard.pop();
}

/**
 * @description All cards have matched, display a message with the final score 
 */
function checkFinish() {
    const modalPage = document.querySelector('.modal');

    // check all cards have matched then stop timer and display a modal popup box
    if (listOpenedCard.length === 16) {
        setTimeout(function() {
            modalPage.setAttribute('style', 'display: block;');
        }, 1000);

        // stop the timer
        stopTime();
        // show a message with the final score in the modal popup box
        showFinalScore();
    }
}

/**
 * @description Display a message with the final score of move counter, star rating and time
 */
function showFinalScore() {
    const content = document.getElementById('show-content');

    content.innerHTML = `With ${moveCounter} Moves, ${star} Stars and Time: ${document.getElementById('timer').innerHTML}`;
}

/**
 * @description Reset the game board, the timer, and the star rating.
 */
function reloadPage() {
    location.reload();
}

/**
 * @description Reset the game board, the timer, the star rating and Hidden the nodal popup when clicked 'play again' button
 */
function playGameAgain() {
    const modalPage = document.querySelector('.modal');

    reloadPage();
    // hide the modal popup
    modalPage.setAttribute('style', 'display: none;');

}

/**
 * @description When the player starts a game by clicking a first card, a displayed timer start. 
 */
function startTimer() {
    let start = Date.now();

    //store the function of setInterval
    timer = setInterval(function() {
        const delta = Date.now() - start;
        const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((delta % (1000 * 60)) / 1000);
        // the calculated time  
        const totalTime = checkTime(hours) + ':' + checkTime(minutes) + ':' + checkTime(seconds);
        // display the calculated time on the page
        document.getElementById('timer').innerHTML = totalTime;
        // update time about every second
    }, 1000);
}

/**
 * @description Add zero in front of numbers < 10
 * @param {...number} t
 * @returns {...number} t - concatenate between zero and number
 */
function checkTime(t) {
    if (t < 10) {
        t = '0' + t;
    }
    return t;
}

/**
 * @description Once the player wins the game, the timer stops.
 */
function stopTime() {
    clearInterval(timer);
}

/**
 * @description increment the move counter and display it on the page, the current number of moves a user has made.
 */
function counter() {
    // increment the move counter
    moveCounter++;
    // display the star rating
    starRating();

    const moves = document.querySelector('.moves');
    // display the number of moves on the page
    moves.textContent = moveCounter;
}

/**
 * @description Display the star ratingdepends on the number of moves
 */
function starRating() {
    const starElement = document.getElementsByClassName('stars')[0];
    const secondStar = starElement.getElementsByTagName('li')[1].firstElementChild;
    const thirdStar = starElement.getElementsByTagName('li')[2].firstElementChild;

    // move less than 12,, get 3 stars 
    if (moveCounter <= 12) {
        star = 3;
        // move less than 17, get 2 stars 
    } else if (moveCounter <= 17) {
        star = 2;
        //display 2 stars on the page
        thirdStar.classList.add('checked');
        // move greater than 17, get 1 star 
    } else if (moveCounter > 17) {
        star = 1;
        //display 1 star on the page
        secondStar.classList.add('checked');
        thirdStar.classList.add('checked');
    }
}

/*
 * set up the event listener for each card when a card is clicked
 */
let cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener('click', flipCard);
}

/*
 * set up the event listener for start a new game when a restart button is clicked
 */
const restartGame = document.querySelector('.restart');

restartGame.addEventListener('click', reloadPage);

/*
 * set up the event listener for start a new game when a play-again button is clicked at congratulation page
 */
const playBtn = document.getElementById('play-game');

playBtn.addEventListener('click', playGameAgain);