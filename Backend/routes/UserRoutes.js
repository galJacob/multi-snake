const UserService = require('../services/UserService');
const USER_URL = '/users';

function addUserRoutes(app) {
    app.get(USER_URL, (req, res) => {
        res.send(req.session);
    })

    app.post(`${USER_URL}/signup`, (req, res) => {
        let user = req.body;
        UserService.addUser(req.body)
            .then(user => {
                res.send(user);
            })
    })
}
module.exports = addUserRoutes;