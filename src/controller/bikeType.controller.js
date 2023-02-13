const bikeTypeService = require('../services/bikeType.service')

async function addType(data) {
    return await bikeTypeService.addType(data)
}
async function getTypes() {
    return await bikeTypeService.getTypes();
}

async function editType(oldName, newName) {
    return await bikeTypeService.editType(oldName, newName);
}
module.exports = {
    addType,
    getTypes,
    editType
}