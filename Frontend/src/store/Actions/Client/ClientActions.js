import { ADD_USER } from './ClientTypes';
import { LOGIN_USER } from './ClientTypes';
import { LOG_OUT } from './ClientTypes';
import UserService from '../../../Services/UserService';
export const addUser = user => ({ type: ADD_USER, payload: UserService.addUser(user) });
export const login = (user = null) => ({ type: LOGIN_USER, payload: UserService.login(user) });
export const logOut = () => ({ type: LOG_OUT, payload: UserService.logOut() })