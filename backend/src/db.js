const UserModel = require('./models/user');
const pbkfd2Password = require('pbkdf2-password');
const hasher = pbkfd2Password();
const crypto = require('crypto');
const { checkName, checkUserID, checkPassword } = require('./security/checkInput');

//로그인용 함수로, DB에서 회원을 찾고 비밀번호를 검증한다.
function findUser(userID, password, callback) {
    if (!checkUserID(userID) || !checkPassword(password)) {
        //입력값이 올바르지 않을 때
        callback(null);
        return;
    }

    UserModel.findOne({userID}, (err, user) => {
        if (user) {
            hasher({password, salt : user.password_salt}, (err, pass, salt, hash) => {
                if (hash === user.password_hash) {
                    const userWithoutPassword = {name: user.name, userID: user.userID};
                    callback(userWithoutPassword);
                    return;
                } else {
                    callback(null);
                }
            })
        } else {
            callback(null);
        }
    })   
}

//회원가입용 함수로, DB에 회원을 추가한다.
function addUser(name, userID, password, callback) {
    if (!checkName(name) || !checkUserID(userID) || !checkPassword(password)) {
        callback(null);
        return;
    }
    hasher({password, salt:crypto.randomBytes(16).toString('hex')}, (err, pass, salt, hash) => {
        console.log(name, userID, password);
        const newUser = new UserModel({
            name,
            userID,
            password_salt: salt,
            password_hash: hash
        });
        newUser.save((err, result) => {
            callback(result);
        })
    });
}

module.exports = {
    findUser,
    addUser
};