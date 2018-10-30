import { ENTER_ROOM } from './TypesToServer';
import { CHANGE_DIRECTION } from './TypesToServer';
import { NEXT_MOVE } from './TypesToServer';
import { START_GAME } from './TypesToServer';

export const enterRoom = (roomNum, user) => ({ type: ENTER_ROOM, payload: { roomNum, user } });
export const changeDirection = direction => ({ type: CHANGE_DIRECTION, payload: direction });
export const nextMove = (board,playingRoom,snake)  => ({ type: NEXT_MOVE, payload:{board,playingRoom,snake} });
export const startGame = (playingRoom, canvasWidth, canvasHeight) => ({
    type: START_GAME,
    payload: { playingRoom, canvasWidth, canvasHeight }
});

