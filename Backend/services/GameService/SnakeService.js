function isOutOfBounds(board, direction) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead) {
                switch (direction) {
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

function isTouchedItSelf(board, direction, nodes) {
    let snakeHeadPos = {};
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead) {
                snakeHeadPos.x = x;
                snakeHeadPos.y = y;
            }
        }
    }
    switch (direction) {
        case 'up':
            if (board[snakeHeadPos.y - 1][snakeHeadPos.x].isSnakeNode) return true;
            break;
        case 'down':
            if (board[snakeHeadPos.y + 1][snakeHeadPos.x].isSnakeNode) return true;
            break;
        case 'left':
            if (board[snakeHeadPos.y][snakeHeadPos.x - 1].isSnakeNode) return true;
            break;
        case 'up':
            if (board[snakeHeadPos.y][snakeHeadPos.x + 1].isSnakeNode) return true;
            break;
        default:
            break;
    }
}

function getLastSnakeHeadPos(board) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead) {
                return { x, y };
            }
        }
    }
}

function updateNodes(nodes, lastSnakeHeadPos, shouldAddNode) {
    let newNodes = [];
    let lastNode = nodes[nodes.length - 1];
    newNodes.push(lastSnakeHeadPos);//first node gets the snakehead pos
    for (let i = 0; i < nodes.length - 1; i++) newNodes.push(nodes[i]);
    if (shouldAddNode) newNodes.push(lastNode);
    return newNodes;
}

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
module.exports = {
    isOutOfBounds,
    isTouchedItSelf,
    getLastSnakeHeadPos,
    updateNodes,
    getDirection
}
