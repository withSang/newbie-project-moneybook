const UserModel = require('./models/user');


function findUser(userID, password, callback) {
    UserModel.findOne({userID}, (err, user) => {
        if (user) {
            const userWithoutPassword = {name: user.name, userID: user.userID};
            callback(userWithoutPassword);
        } else {
            callback(null);
        }
    })
}

function addUser(name, userID, password, callback) {
    const newUser = new UserModel({name, userID, password});
    newUser.save((err, result) => {
        callback(result);
    })
}

module.exports = {
    findUser,
    addUser
};