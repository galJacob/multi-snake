const UserService = require('../services/UserService');
const USER_URL = '/users';

function addUserRoutes(app) {

    app.post(`${USER_URL}/login`, (req, res) => {
        if (req.session.user)
            res.json(req.session.user);
        else {
            if (!Object.keys(req.body).length)
                res.json('ignore')
            else {
                UserService.login(req.body)
                    .then(result => {
                        req.session.user = result;
                        res.json(result);
                    })  
                    .catch(() => {
                        console.log('inside atch');
                        res.json('error in auth')
                    })
            }
        }
    })
    
    app.get(`${USER_URL}/logOut`, (req, res) => {
        req.session.user = null;
        res.json('logged out');
    })
    app.post(`${USER_URL}/signup`, (req, res) => {
        let user = req.body;
        user.sessionID = req.sessionID;
        UserService.addUser(user)
            .then(user => {
                req.session.user = user;
                req.session.wasEverLoggedIn = true;
                res.json(user);
            })
    })
}
module.exports = addUserRoutes;