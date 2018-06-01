# Memory Game Project

The Memory Game project is an interactive game for single player. There are 8 pairs of cards that player need to match. It is web-based application using HTML, CSS, and JavaScript. 

## Table of Contents

* [Instructions](#instructions)
* [Detail of Memory game](#detail of Memory game)

## Instructions

* open `index.html` with browser to explore the web page's style, including can play the game

* open `css/app.css` with text editor to see how to use CSS stylings the web page

* open `js/app.js` with text editor to explore the web page's functionality 

* open `img/geometry2.png` to see the game board's background

For the project instructions, look at [Udacity Classroom](https://classroom.udacity.com/nanodegrees/nd001/parts/a76bb181-979a-4b36-b32f-01bced6e363e/modules/677caa06-55d6-444e-a853-08627c5516a7/lessons/4227cbf4-f6ce-4798-a7e5-b1ce3b9e7c33/concepts/0a38769e-8e23-4e3f-9482-d8d1aa80fbb6)

## Detail of Memory Game

In Memory Game, there are 16 cards in the deck (8 differenet pairs)

The game follows below process:-

* Cards are randomly shuffled and hide symbols

* Player start a game by clicking a card to flip and show symbol. A clock start when player click the first card.

* A player click next card 

* If 2 flipped cards have the same symbol, they matched and stay open. Otherwise, both of them flip back

* After player match all 8 cards, the congratulation page pop up with summary (Duration, Move count, and Star Rating)

#### Star Rating Condition:-

* The star rating reflects a player's performance which depends on number of moves. 

* Finish game with less than 25 moves, a player get 3 star

* Finish game with greater than 26 moves but less than 36 moves, a player get 2 stars

* Finish game with greater than 36 moves but less than 46 moves, a player get 1 stars

* Finish game with greater than 46 moves, a player get 0 star
