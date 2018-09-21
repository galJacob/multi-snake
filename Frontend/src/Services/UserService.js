import axios from 'axios';
axios.defaults.withCredentials = true;
const USER_URL = 'http://localhost:2000/users';

function login(user = null) {
    return axios.post(`${USER_URL}/login`, user)
        .then(res => {
            return res.data;
        })
}

function logOut() {
    return axios.get(`${USER_URL}/logOut`)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
}

function addUser(user) {
    return axios.post(`${USER_URL}/signup`, user)
        .then(res => {
            return res.data;
        })
}

export default {
    addUser,
    login,
    logOut
}