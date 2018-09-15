function getDirection(arrowKey, lastDirection) {
    switch (arrowKey) {
        case 'ArrowDown':
            if (lastDirection === 'up') return 'up';
            return 'down';
        case 'ArrowRight':
            if (lastDirection === 'left') return 'left'
            return 'right';
        case 'ArrowUp':
            if (lastDirection === 'down') return 'down'
            return 'up';
        case 'ArrowLeft':
            if (lastDirection === 'right') return 'right'
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
function isOutOfBounds(board, snake) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead) {
                switch (snake.direction) {
                    case 'right':
                        if (!board[y][x + 1]) return true;
                        break;
                    case 'left':
                        if (!board[y][x - 1]) return true;
                        break;
                    case 'down':
                        if (!board[y + 1]) return true;
                        break;
                    case 'up':
                        if (!board[y - 1]) return true;
                        break;
                    default:
                        break;
                }
            }
        }
    }
}
function isTouchedItSelf(board, snake) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead && board[y][x].isSnakeNode) {
                return true;
            }
        }
    }
}
function updateNodes(nodes, lastSnakeHeadPos) {
    var newNodes = [];
    newNodes.push(lastSnakeHeadPos);
    for (let i = 0; i < nodes.length; i++) {
        if (i === nodes.length - 1) break;
        newNodes.push(nodes[i]);
    }
    return newNodes;
}
function getFirstNode(snakeHeadPos, snakeDirection) {
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
    isOutOfBounds,
    updateNodes,
    getNewPosition,
    checkIfSnakeWillEat,
    getCurrPos,
    isTouchedItSelf,
    getFirstNode
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