const up = "ArrowUp"
const down = "ArrowDown"
const left = "ArrowLeft"
const right = "ArrowRight"

const boardWidth = 16
const boardHeight = 16
const snakeStart = [boardWidth, Math.ceil(boardHeight/2)]
const moveInterval = window.setInterval(move, 250);

var snake = []
var apple = []
var move = []
var snakeLength = 1
var direction = "left"
var gameOver = false

document.onload = drawBoard();

function drawBoard() {
  var playarea = document.getElementById('playarea')
  playarea.style.width = `${boardWidth * 10}px`
  playarea.style.height = `${boardHeight * 10}px`
  for (let i = 1; i <= boardWidth; i++) {
    var column = document.createElement('div')
    column.setAttribute('id', `column ${i}`)
    column.setAttribute('class', 'column')
    playarea.appendChild(column)
    for (let j = 1; j <= boardHeight; j++) {
      var column = document.getElementById(`column ${i}`)
      var box = document.createElement('div')
      var boxId = `x${i}-y${j}`
      box.setAttribute('id', boxId)
      column.appendChild(box)
    }
  }
  drawSnake(snakeStart)
  drawApple()
}

function drawApple() {
  var x = Math.ceil(Math.random() * boardWidth)
  var y = Math.ceil(Math.random() * boardHeight)
  apple = [x, y]
  var appleId = idFromCoords(x, y)
  var appleBox = document.getElementById(appleId)
  if (!appleBox.className.split(' ').includes('snake')) {
    appleBox.classList.add('apple')
  } else {
    drawApple()
  }
}

function drawSnake(newCoords) {
  if (gameOver) return
  snake.unshift(newCoords)
  for (let i = 0; i < snake.length; i++) {
    try { // handle hitting border of board & going out of bounds
      var body = idFromCoords(snake[i][0], snake[i][1])
      var h = document.getElementById(body)
      h.classList.add('snake')
    }
    catch(TypeError) {
      endGame()
    }
  }
  if (snake.length > 1) {
    var tail = idFromCoords(snake[snake.length - 1][0], snake[snake.length - 1][1])
    var previousPostion = document.getElementById(tail)
    previousPostion.classList.remove('snake')
    snake.pop()
  }
  move.pop()
}

function idFromCoords(x, y) {
  return 'x' + String(x) + '-y' + String(y)
}

function addToScore() {
  if (String(snake[0]) === String(apple)) {
    const appleToEat = document.getElementsByClassName('apple')[0]
    appleToEat.classList.remove('apple')
    snake.unshift(apple)
    snakeLength += 1
    drawApple()
  }
}

function endGame() {
  if (gameOver) return
  gameOver = true
  setTimeout( function(){ alert("Game Over") }, 250);
}

function checkIfHeadInBody() {
  if (snake.slice(1,).indexOf(snake[0]) !== -1) {
    endGame()
  }
}

function move() {
  checkIfHeadInBody()
  addToScore()
  if (direction === "left" && snake[0][0] >= 1) {
    drawSnake([snake[0][0] - 1, snake[0][1]])
  } else if (direction === "right" && snake[0][0] <= boardWidth) {
    drawSnake([snake[0][0] + 1, snake[0][1]])
  } else if (direction === "up" && snake[0][1] >= 1) {
    drawSnake([snake[0][0], snake[0][1] - 1])
  } else if (direction === "down" && snake[0][1] <= boardHeight) {
    drawSnake([snake[0][0], snake[0][1] + 1])
  }
}

document.addEventListener('keydown', function(event) {
  var snake = window.snake;
  const key = event.key;
  if ((key === left && direction !== "right") && move.length === 0) {
    direction = "left"
    // move buffer fixes bug where a quick sequence of direction changes causes strange behaviour
    move.push(direction)
  } else if ((key === right && direction !== "left") && move.length === 0) {
    direction = "right"
    move.push(direction)
  } else if ((key === up && direction !== "down") && move.length === 0) {
    direction = "up"
    move.push(direction)
  } else if ((key === down && direction !== "up") && move.length === 0) {
    direction = "down"
    move.push(direction)
  }
})
