import { UPDATE_BOARD } from './Action-types';
import { CHAGE_DIRECTION } from './Action-types';
import { START_INTERVAL } from './Action-types';
import { ADD_NODE } from './Action-types';

const initialState = {
    board: [],
    snake: {
        color: 'red',
        width: 10,
        velocity: 2,
        direction: 'right',
        nodes: [],
    },
    gameInterval: null
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BOARD:
            return { ...state, board: action.payload };
        case CHAGE_DIRECTION:
            let snake = Object.assign({}, state.snake);
            snake.direction = action.payload;
            return { ...state, snake };
        case START_INTERVAL:
            if (action.payload.isStop) {
                clearInterval(state.gameInterval);
            }
            return { ...state, gameInterval: action.payload.gameInterval };
        case ADD_NODE:
            let snakeObj = Object.assign({}, state.snake);
            snakeObj.nodes.push(action.payload);
            return { ...state, snake: snakeObj }
        default:
            return state;
    }
};
export default rootReducer;