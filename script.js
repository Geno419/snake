let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let score = 0;

let backgroundImage = new Image();
backgroundImage.src = 'images/grass.jpg';

let appleImage = new Image();
appleImage.src = 'images/apple.png';

window.onload = function () {
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return;
    }

    // Draw the grass image as the background
    context.drawImage(backgroundImage, 0, 0, board.width, board.height);

    context.drawImage(appleImage, foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        incrementScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > total_col * blockSize || snakeY < 0 || snakeY > total_row * blockSize) {
        gameOver = true;
        endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            endGame();
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

function incrementScore() {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
}

function endGame() {
    alert('Game Over! Score: ' + score + '\nPress OK to restart.');
    restartGame();
}

function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    placeFood();
    gameOver = false;
    score = 0;
    document.getElementById("score").innerText = "Score: 0";
}
