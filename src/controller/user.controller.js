const userService = require('../services/user.service')

async function addUser(user, filename) {
    return await userService.addUser(user, filename);
}

async function loginUser(user) {
    return await userService.loginUser(user);
}

async function getPhoto(name) {
    return await userService.getPhoto(name);
}

module.exports = {
    addUser,
    loginUser,
    getPhoto
}