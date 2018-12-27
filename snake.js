const up = "ArrowUp"
const down = "ArrowDown"
const left = "ArrowLeft"
const right = "ArrowRight"

const boardWidth = 16
const boardHeight = 16
const snakeStart = [boardWidth, Math.ceil(boardHeight/2)]
const moveInterval = window.setInterval(moveAndCheckState, 250);

var snake = []
var apple = []
var directionChange = []
var score = 0
var direction = "left"
var gameStarted = false
var gameOver = false

document.onload = drawBoard(); drawApple();

function drawBoard() {
  const playarea = document.getElementById('playarea')
  playarea.style.width = `${boardWidth * 10}px`
  playarea.style.height = `${boardHeight * 10}px`
  for (let i = 1; i <= boardWidth; i++) {
    var column = document.createElement('div')
    column.setAttribute('id', `column ${i}`)
    column.setAttribute('class', 'column')
    playarea.appendChild(column)
    for (let j = 1; j <= boardHeight; j++) {
      column = document.getElementById(`column ${i}`)
      var box = document.createElement('div')
      var boxId = `x${i}-y${j}`
      box.setAttribute('id', boxId)
      column.appendChild(box)
    }
  }
}

function start() {
  if (gameStarted) {
    location.reload()
  }
  gameStarted = true
  drawSnake(snakeStart)
}

function moveAndCheckState() {
  move();
  checkIfHeadInBody();
  addToScore();
}

function drawApple() {
  const x = Math.ceil(Math.random() * boardWidth)
  const y = Math.ceil(Math.random() * boardHeight)
  apple = [x, y]
  const appleId = idFromCoords(x, y)
  const appleBox = document.getElementById(appleId)
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
      var snakeBody = idFromCoords(snake[i][0], snake[i][1])
      var snakeBodyBox = document.getElementById(snakeBody)
      snakeBodyBox.classList.add('snake')
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
  directionChange.pop()
}

function idFromCoords(x, y) {
  return 'x' + String(x) + '-y' + String(y)
}

function addToScore() {
  if (String(snake[0]) === String(apple)) {
    const appleToEat = document.getElementsByClassName('apple')[0]
    appleToEat.classList.remove('apple')
    snake.unshift(apple)
    score += 1
    drawApple()
  }
  document.getElementById("score").innerText = `Score: ${score}`
}

function endGame() {
  if (gameOver) return // stops Game Over from being repeatedly alerted
  gameOver = true
  setTimeout( function(){ alert("Game Over") }, 250);
  setTimeout( function(){ document.getElementById("start-button").innerText = "Clear Board" }, 250);
}

function checkIfHeadInBody() {
  const snakeHead = snake[0];
  const snakeBody = snake.slice(1,);
  for (let i = 0; i < snakeBody.length; i++) {
    if (String(snakeBody[i]) === String(snakeHead)) {
      endGame()
    }
  }
}

function move() {
  if (!gameStarted) {return}
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
  const snake = window.snake;
  const key = event.key;
  if ((key === left && direction !== "right") && move.length === 0) {
    direction = "left"
    // move buffer fixes bug where a quick sequence of direction changes causes strange behaviour
    directionChange.push(direction)
  } else if ((key === right && direction !== "left") && move.length === 0) {
    direction = "right"
    directionChange.push(direction)
  } else if ((key === up && direction !== "down") && move.length === 0) {
    direction = "up"
    directionChange.push(direction)
  } else if ((key === down && direction !== "up") && move.length === 0) {
    direction = "down"
    directionChange.push(direction)
  }
})

document.getElementById("start-button").innerText = "Start"
document.getElementById("start-button").onclick = function () { start() }
