const userModel = require('../mongoose/model/User.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function addUser(user, filename) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    const check = await userModel.findOne({ email: user.email });
    let data = {};
    if (check) {
        data.message = "Account with that email already Exists";
        return data;
    }
    data = await userModel.insertMany([{
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: filename,
        password: hash,
    }])
    return data;
}

async function loginUser(user) {
    const userData = await userModel.findOne({ email: user.email })
    if (userData) {
        const available = bcrypt.compareSync(user.password, userData.password)
        return available ? { _id: userData._id } : null;
    }
    return null;
}
async function getPhoto(name) {
    const data = await userModel.findOne({ photo: name });
    return data ? data : null;
}
module.exports = {
    addUser,
    loginUser,
    getPhoto
}