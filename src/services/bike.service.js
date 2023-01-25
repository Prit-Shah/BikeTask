const { ObjectId } = require('mongodb');
const { findOne } = require('../mongoose/model/Bike.model');
const BikeModel = require('../mongoose/model/Bike.model');
const bikeModel = require('../mongoose/model/Bike.model')

async function getPhoto(name) {
    const data = await bikeModel.findOne({ photo: name }, '-password -__v');
    console.log(data)
    return data ? data : null;
}
async function addBike(bike, filename) {
    const check = await BikeModel.findOne({ name: bike.name });
    let data = {};
    if (check) {
        data.message = "Bike name already exists";
        return data;
    }
    data = await bikeModel.insertMany([{
        createdBy: bike.createdBy,
        name: bike.name,
        photo: filename,
        typeID: bike.typeID,
    }])
    return data ? data : null;
}

async function editBike(id, bike) {
    const check = await BikeModel.findOne({ name: bike.name });
    let data = {};
    if (check) {
        data.message = "Bike name already exists";
        return data;
    }
    data = await bikeModel.findByIdAndUpdate(id, bike, { returnOriginal: false });
    return data ? data : null;
}

async function getAllBikes() {
    const data = await bikeModel.find({}, '-__v').populate("createdBy", '-__v -password').populate("typeID", '-__v');
    return data ? data : null;
}

async function deleteBike(id) {
    const deleted = await bikeModel.findByIdAndDelete(id);
    return deleted ? deleted : null;
}

async function getByType(id) {
    const data = await bikeModel.find({ typeID: id });
    return data ? data : null;
}

async function getRecent(num) {
    const data = await bikeModel.find().sort({ 'regDate': -1 }).limit(num);
    return data ? data : null;
}

async function addLike(id, user) {
    const likes = await bikeModel.findOne({ _id: id, "likes": user.id })
    let data = {};
    if (likes) {
        data.message = "Already liked";
        return data;
    }
    else {
        const isDislike = await bikeModel.findOne({ _id: id, "dislikes": user.id })
        if (isDislike) {
            await bikeModel.findByIdAndUpdate(id, { $pull: { "dislikes": user.id } })
        }
        data = await bikeModel.findByIdAndUpdate(id, { $push: { "likes": user.id } }, { returnOriginal: false })
    }
    return data ? data : null;
}

async function addDisLike(id, user) {
    const disliked = await bikeModel.findOne({ _id: id, "dislikes": user.id })
    let data = {};
    if (disliked) {
        data.message = "Already Disliked";
        return data;
    }
    else {
        const isLiked = await bikeModel.findOne({ _id: id, "likes": user.id })
        if (isLiked) {
            await bikeModel.findByIdAndUpdate(id, { $pull: { "likes": user.id } })
        }
        data = await bikeModel.findByIdAndUpdate(id, { $push: { "dislikes": user.id } }, { returnOriginal: false })
    }
    return data ? data : null;
}

async function getMostLiked(num) {
    const data = await bikeModel.find({}).sort({ "likes": -1 }).limit(num);
    return data ? data : null;
}

async function addComment(id, user) {
    const data = await bikeModel.findByIdAndUpdate(id, { $push: { "comments": { userID: user.id, comment: user.comment } } }, { returnOriginal: false })
    return data ? data : null;
}

module.exports = {
    addBike,
    editBike,
    getAllBikes,
    deleteBike,
    getByType,
    getRecent,
    addLike,
    addDisLike,
    getMostLiked,
    addComment,
    getPhoto
}