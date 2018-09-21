import { UPDATE_BOARD } from './Action-types';
import { CHAGE_DIRECTION } from './Action-types';
import { ADD_USER } from './Action-types';
import { LOGIN_USER } from './Action-types';
import { LOG_OUT } from './Action-types';
import UserService from '../Services/UserService';


export const updateBoard = board => ({ type: UPDATE_BOARD, payload: board });
export const changeDirection = direction => ({ type: CHAGE_DIRECTION, payload: direction });
export const addUser = user => ({ type: ADD_USER, payload: UserService.addUser(user) });
export const login = (user = null) => ({ type: LOGIN_USER, payload: UserService.login(user) });
export const logOut = () => ({ type: LOG_OUT, payload: UserService.logOut() });






