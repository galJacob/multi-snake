const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService');

function addUser(user) {
    return MongoService.connectToMongo()
        .then(database => {
            const collection = database.collection('users');
            return collection.insertOne(user)
                .then(result => {
                    user._id = result.insertedId;
                    return user;
                })
        })
}

function getUserById(userId) {
    userId = new ObjectId(userId);
    return MongoService.connectToMongo()
        .then(database => {
            const collection = database.collection('users');
            return collection.findOne({ _id: userId })
                .then(user => {
                    return user;
                })
        })
}

function login(user) {
    console.log(user);
    return MongoService.connectToMongo()
        .then(database => {
            const collection = database.collection('users');
            return collection.findOne({ $and: [{ username: user.username }, { password: user.password }] })
                .then(user => {
                    return new Promise((res, rej) => {
                        if (!user) {
                            rej('wrong password/username');
                        }
                        else {
                            console.log('entereeeeddd');
                            
                            res(user);
                        }
                    })
                })
        })
}

module.exports = {
    addUser,
    getUserById,
    login
}