const UserModel = require('./models/user');


function findUser(userID, password, callback) {
    UserModel.findOne({userID}, (err, user) => {
        callback(user);
    })
}

function addUser(name, userID, password) {
    const newUser = new UserModel({name, userID, password});
    newUser.save((err, result) => {
        callback(result);
    })
}

module.exports = {
    findUser,
    addUser
};