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
module.exports = {
    addUser
}