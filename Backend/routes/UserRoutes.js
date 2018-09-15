const UserService = require('../services/UserService');
const USER_URL = '/users';

function addUserRoutes(app) {
    app.get(USER_URL, (req, res) => {
        // UserService.query()
        console.log('kaka');
        res.send('hello')
    })
    app.post(`${USER_URL}/signup`, (req, res) => {
        console.log(req);
        const user = req.body;
        res.send('hello');
    })
}
module.exports = addUserRoutes;