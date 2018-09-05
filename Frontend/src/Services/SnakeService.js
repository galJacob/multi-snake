function getDirection(arrowKey, lastArrowKey) {
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
            return lastArrowKey;
    }
}
function getNewPosition(snakePosition, snakeAspects) {
    switch (snakeAspects.direction) {
        case 'left':
            return { x: snakePosition.x - snakeAspects.velocity, y: snakePosition.y };
        case 'right':
            return { x: snakePosition.x + snakeAspects.velocity, y: snakePosition.y };
        case 'down':
            return { x: snakePosition.x, y: snakePosition.y + snakeAspects.velocity };
        case 'up':
            return { x: snakePosition.x, y: snakePosition.y - snakeAspects.velocity };
        default:
            return;
    }
}

export default {
    getDirection,
    getNewPosition
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