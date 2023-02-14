var boxSize = 25;
var row = 25;
var col = 25;
var board;
var context;
var gameOver = false; //game over variable

// snake coordinate
var snakeX = boxSize * 5;
var snakeY = boxSize * 5;

// snake body
var snakeBody = [];

//velocity
var velocityX = 0;
var velocityY = 0;

//food
var foodX;
var foodY;


window.onload = function () {
    alert("PRESS ARROW KEYS TO PLAY");
    board = document.getElementById("canvas");
    console.log(board);
    board.height = row * boxSize;
    board.width = col * boxSize;
    context = board.getContext("2d"); //use to draw board

    $("body").keyup(direction);
    foodPlace();
    setInterval(update, 2000 / 10); //200 millisecond
}

function update() {
    if(gameOver){
        alert("Score = " + snakeBody.length);
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, boxSize, boxSize);

    context.fillStyle = 'lime'
    context.fillRect(snakeX, snakeY, boxSize, boxSize);

    // changing snake position
    snakeX += velocityX * boxSize;
    snakeY += velocityY * boxSize;

    //consuming food
    if ((foodX === snakeX) && (foodY === snakeY)) {
        snakeBody.push([foodX , foodY]);
        foodPlace();
    }

    for(i=snakeBody.length-1 ; i>0 ; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    for(var i=0 ; i<snakeBody.length ; i++){
        context.fillStyle = 'yellow'
        context.fillRect(snakeBody[i][0] , snakeBody[i][1] , boxSize , boxSize);
    }

    // game over conditions
    if((snakeX < 0)||(snakeY < 0)||(snakeX > col*boxSize)||snakeY > row*boxSize){
        gameOver = true;
    }

    for(i=1 ; i<snakeBody.length;i++){
        if((snakeX == snakeBody[i][0])&&(snakeY == snakeBody[i][1])){
            gameOver = true;
        }
    }
}

function foodPlace() {
    foodX = Math.floor(Math.random() * col) * boxSize;
    foodY = Math.floor(Math.random() * row) * boxSize;
}

function direction(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (velocityY != 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case 'ArrowDown':
            if (velocityY != -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;

        case 'ArrowLeft':
            if (velocityX != 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;

        case 'ArrowRight':
            if (velocityX != -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
}