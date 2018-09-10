function getDirection(arrowKey, lastDirection) {
    switch (arrowKey) {
        case 'ArrowDown':
            return 'down';
        case 'ArrowRight':
            return 'right';
        case 'ArrowUp':
            return 'up';
        case 'ArrowLeft':
            return 'left';
        default:
            return lastDirection;
    }
}
function getNewPosition(snake) {
    switch (snake.direction) {
        case 'left':
            return { x: snake.position.x - 1, y: snake.position.y };
        case 'right':
            return { x: snake.position.x + 1, y: snake.position.y };
        case 'down':
            return { x: snake.position.x, y: snake.position.y + 1 };
        case 'up':
            return { x: snake.position.x, y: snake.position.y - 1 };
        default:
            return;
    }
}
function getCurrPos(board) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead) {
                console.log(x, y);
                return { x, y };
            }
        }
    }
}
function checkIfSnakeWillEat(snake, food) {
    if (snake.position.x === food.position.x && snake.position.y === food.position.y)
        return true;
}
function addNode(snakeHeadPos, snakeDirection) {
    switch (snakeDirection) {
        case 'left':
            return { x: snakeHeadPos.x + 1, y: snakeHeadPos.y };
        case 'right':
            return { x: snakeHeadPos.x - 1, y: snakeHeadPos.y };
        case 'down':
            return { x: snakeHeadPos.x, y: snakeHeadPos.y - 1 };
        case 'up':
            return { x: snakeHeadPos.x, y: snakeHeadPos.y + 1 };
        default:
            return;
    }
}

export default {
    getDirection,
    getNewPosition,
    checkIfSnakeWillEat,
    getCurrPos,
    addNode
}
 // ArrowDown
        // Board.js: 55 ArrowRight
        // Board.js: 55 ArrowUp
        // Board.js: 55 ArrowLeft
        // switch (ev.key) {
        //     case 'ArrowDown':
        //         this.setState({ snakeAspects: {} })
        //         break;
        // }