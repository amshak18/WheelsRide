const {vehicleService} = require("../service/vehicle.service");

class VehicleController {
    constructor() {
    }

    async getVehiclesForUser(userId) {
        return await vehicleService.getVehiclesForUser(userId);
    }

    async createVehicle(body) {
        return await vehicleService.createVehicle(body);
    }

    async deleteVehicleById(id) {
        return await vehicleService.deleteById(id);
    }

    async updateVehicle(vehicle) {
        return await vehicleService.updateVehicle(vehicle);
    }
}

const vehicleController = new VehicleController();

module.exports = {
    vehicleController
}
