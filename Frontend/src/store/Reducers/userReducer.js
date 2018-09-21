import { ADD_USER } from '../Action-types';
import { LOGIN_USER } from '../Action-types';
import { LOG_OUT } from '../Action-types';


const initialState = {
    loggedInUser: null,
    statusReq: 'BEFORE_REQ',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${ADD_USER}_FULFILLED`:
            return { ...state, loggedInUser: action.payload };
        case `${LOGIN_USER}_FULFILLED`:
            if (action.payload === 'ignore')
                return { ...state, loggedInUser: null, statusReq: 'FULLFILD' };
            else if (action.payload === 'error in auth') {
                alert('error in username or password')
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
