const {vehicleService} = require("../service/vehicle.service");

/**
 * This is the controller used to control vehicle operations.
 */
class VehicleController {
    constructor() {
    }

    /**
     * get the vehicles associated with a user
     * @param userId the user id of the user
     * @return {Promise<*>} a promise containing the list of vehicles owned by the user.
     */
    async getVehiclesForUser(userId) {
        return await vehicleService.getVehiclesForUser(userId);
    }

    /**
     * this method is used to create a new vehicle
     * @param body the body containing the userid and the vehicle object
     * @return {Promise<*|undefined>} the promise containing the created vehicle
     */
    async createVehicle(body) {
        return await vehicleService.createVehicle(body);
    }

    /**
     * this method is used to delete the vehicle by the given id.
     * @param id the id of the vehicle to be deleted
     * @return {Promise<{id: *, deletedStatus: string}>} the promise containing the status of the deleted vehicle.
     */
    async deleteVehicleById(id) {
        return await vehicleService.deleteById(id);
    }

    /**
     * this method is used to update the vehicle information
     * @param vehicle the vehicle object containing the updated information
     * @return {Promise<*|{}>} the promise containing the updated vehicle.
     */
    async updateVehicle(vehicle) {
        return await vehicleService.updateVehicle(vehicle);
    }
}

const vehicleController = new VehicleController();

module.exports = {
    vehicleController
}
