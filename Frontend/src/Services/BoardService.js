
function getPositions(board) {
    let positions = {};
    positions.snakeNodes = [];
    positions.foods = [];
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead)
                positions.snakeHeadPos = { x, y };
            if (board[y][x].isFood)
                positions.foods.push({ pos: { x, y }, ...board[y][x].isFood });
            if (board[y][x].isSnakeNode)
                positions.snakeNodes.push({ x, y });
        }
    }
    return positions;
}

export default {
    getPositions
}
