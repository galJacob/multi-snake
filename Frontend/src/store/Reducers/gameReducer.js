import { UPDATE_BOARD } from '../Action-types';
import { CHAGE_DIRECTION } from '../Action-types';

const initialState = {
    board: [],
    snake: {
        color: 'red',
        width: 10,
        velocity: 2,
        direction: 'right',
        nodes: [],
    },
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BOARD:
            return { ...state, board: action.payload };
        case CHAGE_DIRECTION:
            let snake = Object.assign({}, state.snake);
            snake.direction = action.payload;
            return { ...state, snake };
        default:
            return state;
    }
};

export default gameReducer;