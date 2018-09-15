import Utils from '../Utils';
const PX_CLEAR = 0.001;

function getbuiltBoard(canvasWidth, canvasHeight) {
console.log(canvasWidth);

    let xAxisCells = (parseInt(canvasWidth / 10, 10) * 10) / 10;
    let yAxisCells = (parseInt(canvasHeight / 10, 10) * 10) / 10;
    let board = [];
    for (let y = 0; y < yAxisCells; y++) {
        board[y] = [];
        for (let x = 0; x < xAxisCells; x++) {
            board[y][x] = { isFood: false, isSnakeNode: false, isSnakeHead: false };
        }
    }
    return board;
}
function checkIfFoodEaten(board) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead && board[y][x].isFood) {
                return true;
            }
        }
    }
}
function getPositions(board) {
    let positions = {};
    positions.snakeNodes = [];
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead)
                positions.snakeHeadPos = { x, y };
            if (board[y][x].isFood)
                positions.foodPos = { x, y };
            if (board[y][x].isSnakeNode)
                positions.snakeNodes.push({ x, y });
        }
    }
    return positions;
}
function addNewNode(nodePos, board) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (nodePos.x === x && nodePos.y === y) {
                board[y][x].isSnakeNode = true;
            }
        }
    }
    return board;
}
function getBoardMovedSnake(board, snake) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead) {
                switch (snake.direction) {
                    case 'right':
                        board[y][x].isSnakeHead = false;
                        // console.log(board[y][x + 1]);
                        board[y][x + 1].isSnakeHead = true;
                        return board;
                    case 'left':
                        board[y][x].isSnakeHead = false;
                        board[y][x - 1].isSnakeHead = true;
                        return board;
                    case 'down':
                        board[y][x].isSnakeHead = false;
                        board[y + 1][x].isSnakeHead = true;
                        return board;
                    case 'up':
                        board[y][x].isSnakeHead = false;
                        board[y - 1][x].isSnakeHead = true;
                        return board;
                    default:
                        break;
                }
            }
        }
    }
    return board;
}
function getBoardMovedFirstNode(board, lastSnakeHeadPos) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeNode) {
                board[y][x].isSnakeNode = false;
            }
        }
    }
    board[lastSnakeHeadPos.y][lastSnakeHeadPos.x].isSnakeNode = true;
    return board;
}
function getBoardAllNodes(board, nodes) {
    console.log(nodes);
    console.log(nodes);


    return board;
}
function getClearSnakeCtx(currPos, snake) {
    return [currPos.x * 10 - PX_CLEAR, currPos.y * 10 - PX_CLEAR, snake.width + PX_CLEAR * 2,
    (snake.nodes.length + 1) * 10 + PX_CLEAR * 2];
    // switch (snake.direction) {
    //     case 'left':
    //         return [snake.position.x - PX_CLEAR, snake.position.y - PX_CLEAR, snake.length + PX_CLEAR, snake.width + PX_CLEAR];
    //     case 'up':
    //         return [snake.position.x - PX_CLEAR, snake.position.y, snake.length + PX_CLEAR, snake.width + PX_CLEAR];
    //     case 'right':
    //         return [snake.position.x - PX_CLEAR, snake.position.y, snake.length + PX_CLEAR, snake.width + PX_CLEAR];
    //     default:
    //         return [snake.position.x - PX_CLEAR, snake.position.y, snake.length + PX_CLEAR, snake.width + PX_CLEAR]
    // }
}
function getFillSnakeCtx(snake) {
    return [snake.position.x * 10, snake.position.y * 10, snake.width, (snake.nodes.length + 1) * 10];
}
function getFillFoodCtx(food) {
    return [food.position.x * 10, food.position.y * 10, food.aspectRatio, food.aspectRatio]
}
function getFoodPosition(canvasWidth, canvasHeight, snake, food) {
    let x = Utils.getRandNum(canvasWidth);
    let y = Utils.getRandNum(canvasHeight);
    let possibleFoodPos = { x, y };
    _checkAvailabeSpace(snake, food, possibleFoodPos)
}
function getBoardWithFoodAndSnake(board) {
    let snakeX = Utils.getRandNum(board[0].length);
    let snakeY = Utils.getRandNum(board.length);
    let foodX = Utils.getRandNum(board[0].length);
    let foodY = Utils.getRandNum(board.length);
    while (foodX === snakeX && foodY === snakeY) {
        foodX = Utils.getRandNum(board[0].length);
        foodY = Utils.getRandNum(board.length);
    }
    let nodes = [{ y: snakeY, x: snakeX - 1 }, { y: snakeY, x: snakeX - 2 }];
    board[snakeY][snakeX].isSnakeHead = true;
    board[snakeY][snakeX - 1].isSnakeNode = true;
    board[snakeY][snakeX - 2].isSnakeNode = true;
    board[foodY][foodX].isFood = true;
    return { board, nodes };
}
function getBoardMovedNodes(board, nodes) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            board[y][x].isSnakeNode = false;
        }
    }
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            nodes.forEach(node => {
                if (node.x === x && node.y === y)
                    board[y][x].isSnakeNode = true;
            });
        }
    }
    return board;
}
function _checkAvailabeSpace(snake, food, possibleFoodPos) {
    // if (snake.direction === 'left' || snake.direction === 'right') { }
    // for (let x = snake.position.x; x <= snake.length + snake.position.x; x++) {
    //     for (let y = snake.position.y; x <= snake.length + snake.position.x; x++) {

    //     }
    // }
}

export default {
    checkIfFoodEaten,
    getBoardAllNodes,
    getBoardMovedNodes,
    getBoardMovedFirstNode,
    addNewNode,
    getbuiltBoard,
    getPositions,
    getBoardMovedSnake,
    getFillFoodCtx,
    getFoodPosition,
    getClearSnakeCtx,
    getFillSnakeCtx,
    getBoardWithFoodAndSnake
}