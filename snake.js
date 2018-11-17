const up = "ArrowUp"
const down = "ArrowDown"
const left = "ArrowLeft"
const right = "ArrowRight"
const boardWidth = 24
const boardHeight = 24
const snakeStart = [boardWidth, Math.ceil(boardHeight/2)]
const intervalID = window.setInterval(move, 250);
var snake = []
var apple = []
var snakeLength = 1
var direction = "left"

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
  if (apple.length > 0) {
    var appleToEat = document.getElementsByClassName('apple')[0]
    appleToEat.classList.remove('apple')
  }
  var x = Math.ceil(Math.random() * boardWidth)
  var y = Math.ceil(Math.random() * boardHeight)
  apple = [x, y]
  var appleId = idFromCoords(x, y)
  var appleBox = document.getElementById(appleId)
  appleBox.classList.add('apple')
}

function drawSnake(newCoords) {
  snake.unshift(newCoords)
  for (let i = 0; i < snake.length; i++) {
    var body = idFromCoords(snake[i][0], snake[i][1])
    var h = document.getElementById(body)
    h.classList.add('snake')
  }
  if (snake.length > 1) {
    var tail = idFromCoords(snake[snake.length - 1][0], snake[snake.length - 1][1])
    var h = document.getElementById(tail)
    h.classList.remove('snake')
    snake.pop()
  }
}

function idFromCoords(x, y) {
  return 'x' + String(x) + '-y' + String(y)
}

function addToScore() {
  if (String(snake[0]) === String(apple)) {
    snake.unshift(apple)
    snakeLength += 1
    drawApple()
  }
}

function move() {
  addToScore()
  if (direction === "left" && snake[0][0] > 1) {
    drawSnake([snake[0][0] - 1, snake[0][1]])
  } else if (direction === "right" && snake[0][0] < boardWidth) {
    drawSnake([snake[0][0] + 1, snake[0][1]])
  } else if (direction === "up" && snake[0][1] > 1) {
    drawSnake([snake[0][0], snake[0][1] - 1])
  } else if (direction === "down" && snake[0][1] < boardHeight) {
    drawSnake([snake[0][0], snake[0][1] + 1])
  }
}

document.addEventListener('keydown', function(event) {
  var snake = window.snake;
  const key = event.key;
  if (key === left && snake[0][0] > 1 && direction !== "right") {
    direction = "left"
  } else if (key === right && snake[0][0] < boardWidth && direction !== "left") {
    direction = "right"
  } else if (key === up && snake[0][1] > 1 && direction !== "down") {
    direction = "up"
  } else if (key === down && snake[0][1] < boardHeight && direction !== "up") {
    direction = "down"
  }
})
