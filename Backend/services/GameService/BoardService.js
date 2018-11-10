const Utils = require('../Utils');

function buildBoard(canvasWidth, canvasHeight) {
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
function moveFood(board, food) {
    let positions = {};
    positions.nodes = [];
    positions.foods = [];
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead)
                positions.snakeHead = { y, x };
            if (board[y][x].isFood)
                if (y === food.pos.y && x === food.pos.x) board[y][x].isFood = false;
            positions.foods.push({ y, x });
            if (board[y][x].isSnakeNode)
                positions.nodes.push({ y, x });
        }
    }
    let newX = Utils.getRandNum(board[0].length);
    let newY = Utils.getRandNum(board.length);
    positions.foods.forEach(food => {
        positions.nodes.forEach(node => {
            while ((food.x === newX && food.y === newY) ||
                (positions.snakeHead.y === newY && positions.snakeHead.x === newX) ||
                (node.x === newX && node.y === newY)) {
                newX = Utils.getRandNum(board[0].length);
                newY = Utils.getRandNum(board.length);
            }
        })
    })
    board[newY][newX].isFood = { userSocket: food.userSocket, color: food.color };
    return board;
}
function _putFood(board, socketsInRoom, snakeX, snakeY) {
    let colors = ['blue', 'green'];
    for (let i = 0; i < socketsInRoom.length; i++) {
        let foodX = Utils.getRandNum(board[0].length);
        let foodY = Utils.getRandNum(board.length);
        while ((foodX === snakeX && foodY === snakeY) ||
            (foodX === snakeX - 1 && foodY === snakeY) ||
            (foodX === snakeX - 2 && foodY === snakeY)) {
            foodX = Utils.getRandNum(board[0].length);
            foodY = Utils.getRandNum(board.length);
        }
        board[foodY][foodX].isFood = { userSocket: socketsInRoom[i], color: colors[i] };
    }
    return board;
}
function getBoardWithFoodAndSnake(board, socketsInRoom) {
    let snakeX = Utils.getRandNum(board[0].length);
    let snakeY = Utils.getRandNum(board.length);
    board[snakeY][snakeX].isSnakeHead = true;
    board[snakeY][snakeX - 1].isSnakeNode = true;
    board[snakeY][snakeX - 2].isSnakeNode = true;
    board = _putFood(board, socketsInRoom, snakeX, snakeY);
    return { board, nodes: [{ x: snakeX - 1, y: snakeY }, { x: snakeX - 2, y: snakeY }] };
}

function getBoardMovedNodes(board, nodes) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            board[y][x].isSnakeNode = false;
        }
    }
    nodes.forEach(node => {
        board[node.y][node.x].isSnakeNode = true;
    })
    // for (let y = 0; y < board.length; y++) {
    //     for (let x = 0; x < board[y].length; x++) {
    //         nodes.forEach(node => {
    //             if (node.x === x && node.y === y)
    //                 board[y][x].isSnakeNode = true;
    //         });
    //     }
    // }
    return board;
}

function getBoardMovedSnake(board, direction) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead) {
                switch (direction) {
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

function checkIfFoodEatenAndGetPos(board, direction) {
    let foods = [];
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isFood) {
                foods.push({ pos: { x, y }, ...board[y][x].isFood });
            }
        }
    }
    // let food = null;
    switch (direction) {
        case 'up':
            return foods.find(food => {
                if (food.pos.y === board.length - 1) return false;
                return board[food.pos.y + 1][food.pos.x].isSnakeHead
            })
        case 'down':
            return foods.find(food => {
                if (!food.pos.y) return false;
                return board[food.pos.y - 1][food.pos.x].isSnakeHead
            })
        case 'left':
            return foods.find(food => {
                if (food.pos.x === board[0].length - 1) return false;
                return board[food.pos.y][food.pos.x + 1].isSnakeHead
            })
        case 'right':
            return foods.find(food => {
                if (!food.pos.x) return false;
                return board[food.pos.y][food.pos.x - 1].isSnakeHead
            })
        default:
            break;
    }
}

function addNode(board) {

}

function getNodes(board) {
    let nodes = [];
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeNode)
                nodes.push({ y, x });
        }
    }
    return nodes;
}

module.exports = {
    buildBoard,
    getBoardWithFoodAndSnake,
    checkIfFoodEatenAndGetPos,
    moveFood,
    addNode,
    getBoardMovedSnake,
    getBoardMovedNodes
}

