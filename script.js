document.addEventListener('DOMContentLoaded', () => {
const squares = document.querySelectorAll('.grid div')
const scoreDisplay = document.querySelectorAll('span')
const startBtn = document.querySelector('.start')

const width = 10
let currentIndex = 0
let powerupIndex = 0
let currentSnake = [2,1,0] // 2 is head, 1 is body, 0 is tail
let direction = 1
let score = 0
let speed = .9
let intervalTime = 0
let interval = 0

//From FreeCodeCamp: https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/
//this function resets and starts the game by reverting back to the original "let"'s that we had. it selects a new spot for the power up and reverts the snake back to its original state.
//start game/reset game
function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[powerupIndex].classList.remove('powerup')
    clearInterval(interval)
    score = 0
    //resetting the powerup
    randomPowerup()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
}

//snake touching border and self & function to receive the powerup
function moveOutcomes(){
//snake touching border and self
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width -1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        return clearInterval(interval)//the interval will be cleared if the snake touches border or self
    }
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')//removes class of snake from tail
    currentSnake.unshift(currentSnake[0] + direction)

    //if snake gets powerup
    if(squares[currentSnake[0]].classList.contains('powerup')){
    squares[currentSnake[0]].classList.remove('powerup')
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    //randomize powerup
    randomPowerup()
    score++
    scoreDisplay.textContent = score
    clearInterval(interval)
    intervalTime = intervalTime * speed
    interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

//creating new powerup
function randomPowerup() {
    do{
        //From ZetCode: https://zetcode.com/javascript/snake/
        //uses the Math object to help assist in randomly selecting somewhere on the grid to place the powerup
        powerupIndex = Math.floor(Math.random() * squares.length)
    } while (squares[powerupIndex].classList.contains('snake')) //powerups will not spawn on snake
    squares[powerupIndex].classList.add('powerup')
}
function control(e) {
    squares[currentIndex].classList.remove('snake')
    //From Coding with Adam: https://www.youtube.com/watch?v=7Azlj0f9vas&ab_channel=CodingWithAdam
    //The video provided the corresponding keycodes for the arrowkeys as well as gave the structure of using them for movement in an if/else statement.
        if(e.keyCode === 39) {
            direction = 1 //Snake Moves Right
        }
            else if (e.keyCode === 38) {
                direction = -width // Snake Moves Up
            }
            else if (e.keyCode === 37) {
                direction = -1 //Snake Moves Left
            }
            else if (e.keyCode ===40) {
                direction = +width //Snake moves down
            }
}

document.addEventListener('keyup',control)
startBtn.addEventListener('click', startGame)
})