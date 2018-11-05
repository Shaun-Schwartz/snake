const up = "ArrowUp"
const down = "ArrowDown"
const left = "ArrowLeft"
const right = "ArrowRight"

var boardWidth = 50
var boardHeight = 50

var snake = [[boardWidth, Math.ceil(boardHeight/2)]]
var apple = []
var snakeLength = 1

document.onload = drawBoard(); drawApple();

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
  drawSnake(snake)
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

function drawSnake(snake) {
  for (let i = 0; i < snake.length; i++) {
    var x = snake[i][0]
    var y = snake[i][1]
    var head = idFromCoords(x,y)
    var h = document.getElementById(head)
    h.classList.add('snake')
  }
}

function idFromCoords(x, y) {
  return 'x' + String(x) + '-y' + String(y)
}

function addToScore() {
  if (String(snake[0]) === String(apple)) {
    snakeLength += 1
    drawApple()
  }
}

document.addEventListener('keydown', function(event) {
  addToScore()
  var snake = window.snake;
  const key = event.key;
  if (key === left && snake[0][0] > 1) {
    snake[0][0] = snake[0][0] - 1
    drawSnake(snake)
  }
  if (key === right && snake[0][0] < boardWidth) {
    snake[0][0] = snake[0][0] + 1
    drawSnake(snake)
  }
  if (key === up && snake[0][1] > 1) {
    snake[0][1] = snake[0][1] - 1
    drawSnake(snake)
  }
  if (key === down && snake[0][1] < boardHeight) {
    snake[0][1] = snake[0][1] + 1
    drawSnake(snake)
  }
})
