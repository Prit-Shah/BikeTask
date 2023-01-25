const bikeTypeService = require('../services/bikeType.service')

async function addType(data) {
    return await bikeTypeService.addType(data)
}
async function getTypes() {
    return await bikeTypeService.getTypes();
}
module.exports = {
    addType,
    getTypes
}