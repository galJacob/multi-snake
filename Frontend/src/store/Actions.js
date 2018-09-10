import { UPDATE_BOARD } from './Action-types';
import { CHAGE_DIRECTION } from './Action-types';
import { START_INTERVAL } from './Action-types';
import { ADD_NODE } from './Action-types';

export const updateBoard = board => ({ type: UPDATE_BOARD, payload: board });
export const changeDirection = direction => ({ type: CHAGE_DIRECTION, payload: direction });
export const startInterval = interval => ({ type: START_INTERVAL, payload: interval });
export const addNode = newNode => ({ type: ADD_NODE, payload: newNode });



