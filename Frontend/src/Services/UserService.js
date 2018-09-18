import axios from 'axios';
const USER_URL = 'http://localhost:2000/users';

function query() {
    axios.get(USER_URL)
        .then(() => {
            console.log('a');
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
    query
}