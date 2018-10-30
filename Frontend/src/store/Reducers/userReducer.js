import { ADD_USER } from '../Actions/Client/ClientTypes';
import { LOGIN_USER } from '../Actions/Client/ClientTypes';
import { LOG_OUT } from '../Actions/Client/ClientTypes';
import { ROOM_ENTERED, FORBID_ROOM, UPDATE_SCORES } from '../Actions/FromServer/TypesFromServer';

const initialState = {
    loggedInUser: null,
    statusReq: 'BEFORE_REQ',
    playersWithRooms: [],
    forbiddenRoom: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SCORES:
            let players = JSON.parse(JSON.stringify(state.playersWithRooms));
            players = players.map(player => {
                if (player.user.userSocket === action.payload) player.user.score = player.user.score + 10;
                return player;
            })
            return { ...state, playersWithRooms: players };
        case ROOM_ENTERED:
            let playersWithRooms = state.playersWithRooms;
            if (!playersWithRooms.length)
                return { ...state, playersWithRooms: [...state.playersWithRooms, action.payload] };
            else {
                let isSameRoom = state.playersWithRooms.some(playerWRoom => {
                    return playerWRoom.roomNum === action.payload.roomNum;
                })
                if (isSameRoom)
                    return { ...state, playersWithRooms: [...state.playersWithRooms, action.payload] };
                else
                    return { ...state, playersWithRooms: [...state.playersWithRooms] };
            }
        case FORBID_ROOM:
            return { ...state, forbiddenRoom: action.payload };
        case `${ADD_USER}_FULFILLED`:
            return { ...state, loggedInUser: action.payload };
        case `${LOGIN_USER}_FULFILLED`:
            if (action.payload === 'ignore')
                return { ...state, loggedInUser: null, statusReq: 'FULLFILD' };
            else if (action.payload === 'error in auth') {
                alert('error in username or password');
                return { ...state, loggedInUser: null, statusReq: 'FULLFILD' };
            }
            return { ...state, loggedInUser: action.payload, statusReq: 'FULLFILD' };
        case `${LOGIN_USER}_PENDING`:
            return { ...state, statusReq: 'PENDING' };
        case `${LOG_OUT}_FULFILLED`:
            return { ...state, loggedInUser: null };
        default:
            return state;
    }
};

export default userReducer;
