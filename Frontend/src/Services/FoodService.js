import Utils from '../Utils';
function moveFood(board) {
    let newX = Utils.getRandNum(board[0].length);
    let newY = Utils.getRandNum(board.length);
    let positions = {};
    positions.nodes = [];
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isSnakeHead)
                positions.snakeHead = { y, x };
            if (board[y][x].isFood)
                positions.food = { y, x };
            if (board[y][x].isSnakeNode)
                positions.nodes.push({ y, x });
        }
    }
    console.log(board.length);
    console.log(board[0].length);
    board[positions.food.y][positions.food.x].isFood = false;
    while ((positions.food.y === newY && positions.food.x === newX) ||
        (positions.snakeHead.y === newY && positions.snakeHead.x === newX)) {
        console.log('entered');
        newX = Utils.getRandNum(board[0].length);
        newY = Utils.getRandNum(board.length);
    }
    console.log('newx:', newX, 'newy:', newY);
    board[newY][newX].isFood = true;
    return board;
}
export default {
    moveFood,
}