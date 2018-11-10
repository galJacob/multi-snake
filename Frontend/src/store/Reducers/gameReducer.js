import { SEND_BOARD_SNAKE_TO_CLIENT, SEND_GAME_OVER } from '../Actions/FromServer/TypesFromServer';

const initialState = {
    board: [],
    snake: {
        color: 'red',
        width: 10,
        lastHeadPos: null,
        velocity: 2,
        direction: 'right',
        nodes: [],
    },
    isGameEnded: false
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_GAME_OVER:
            return { ...state, isGameEnded: true };
        case SEND_BOARD_SNAKE_TO_CLIENT:
            let snake = Object.assign({}, state.snake);
            snake.nodes = action.payload.nodes;
            return { ...state, board: action.payload.board, snake };
        default:
            return state;
    }
};

export default gameReducer;