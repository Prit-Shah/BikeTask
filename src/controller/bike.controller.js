const bikeService = require('../services/bike.service')

async function addBike(bike, filename) {
    try {
        return await bikeService.addBike(bike, filename);
    } catch (err) {
        throw err;
    }
}
async function editBike(id, bike) {
    try {
        return await bikeService.editBike(id, bike);
    } catch (err) {
        throw err;
    }
}
async function getByID(id) {
    try {
        return await bikeService.getByID(id);
    }
    catch (err) {
        throw err;
    }
}
async function getAllBikes() {
    try {
        return await bikeService.getAllBikes();
    } catch (err) {
        throw err;
    }
}
async function deleteBike(id) {
    try {
        return await bikeService.deleteBike(id);
    } catch (err) {
        throw err;
    }
}
async function getByType(id) {
    try {
        return await bikeService.getByType(id);
    } catch (err) {
        throw err;
    }
}
async function getRecent(num) {
    try {
        return await bikeService.getRecent(num);
    } catch (err) {
        throw err;
    }
}
async function addLike(id, user) {
    try {
        return await bikeService.addLike(id, user);
    } catch (err) {
        throw err;
    }
}
async function getMostLiked(num) {
    try {
        return await bikeService.getMostLiked(num);
    } catch (err) {
        throw err;
    }
}
async function addComment(id, user) {
    try {
        return await bikeService.addComment(id, user);
    } catch (err) {
        throw err;
    }
}
async function getPhoto(name) {
    try {
        return await bikeService.getPhoto(name);
    } catch (err) {
        throw err
    }
}
async function addDisLike(id, user) {
    try {
        return await bikeService.addDisLike(id, user);
    } catch (err) {
        throw err;
    }
}
module.exports = {
    addBike,
    editBike,
    getAllBikes,
    deleteBike,
    getByType,
    getRecent,
    addLike,
    getMostLiked,
    addComment,
    getPhoto,
    addDisLike,
    getByID
}