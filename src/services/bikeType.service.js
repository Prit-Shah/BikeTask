const BikeTypeModel = require('../mongoose/model/BikeType.model')

async function addType(type) {
    const check = await BikeTypeModel.findOne({ name: type.name });
    let data = {};
    if (check) {
        data.message = "Type name already Exists";
        return data;
    }
    data = await BikeTypeModel.insertMany([
        {
            name: type.name,
            createdBy: type.createdBy,
        }
    ])
    return data ? data : null;
}

async function getTypes() {
    const data = await BikeTypeModel.find({}, '-__v').populate('createdBy', '-password -__v');
    return data ? data : null;
}

module.exports = {
    addType,
    getTypes
}