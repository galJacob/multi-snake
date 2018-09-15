import axios from 'axios';
const USER_URL = 'http://localhost:4000/users';

function query() {
    axios.get(USER_URL)
        .then(() => {
            console.log('a');
        })
}

function addUser(user) {
    axios.post(`${USER_URL}/signup`, { user })
        .then(res => {
            console.log('a');
        })
}
export default {
    addUser,
    query
}