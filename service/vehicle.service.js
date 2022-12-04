const _ = require("lodash");
const {vehicleRepository} = require("../repository/vehicle.repository");
const {addressRepository} = require("../repository/address.repository");
const {userRepository} = require("../repository/user.repository");
const {stateRepository} = require("../repository/state.repository");
const {latLngRepository} = require("../repository/latLng.repository");
const {Vehicle} = require("../model/vehicle.model");

/**
 * This is a service used to serve /vehicle endpoints
 */
class VehicleService {
    constructor() {
    }

    /**
     * this method is used to create a new vehicle
     * @param body the body containing the userid and the vehicle document.
     * @returns {Promise<*>} the promise containing the created vehicle document.
     */
    async createVehicle(body) {
        let vehicle = _.get(body, 'vehicle', {});
        let userId = _.get(body, 'userId', '');
        let user;
        if (!_.isEmpty(vehicle) && !_.isEmpty(userId)) {
            let vehicleAddress = _.get(vehicle, 'vehicleLocation', {});
            user = await userRepository.findByUserId(userId);
            if (!_.isEmpty(vehicleAddress) && !_.isEmpty(user)) {
                let state = _.get(vehicleAddress, 'state', {});
                let currentLocation = _.get(vehicle, 'vehicleCurrentPosition', {});
                if (!_.isEmpty(state)) {
                    let savedState;
                    savedState = await stateRepository.getStateBy(_.get(state, 'name'));
                    state = _.isEmpty(savedState) ? await stateRepository.createState(state) : savedState;
                    vehicleAddress.state = _.get(state, '_id');
                }
                if (!_.isEmpty(currentLocation)) {
                    currentLocation = await latLngRepository.createLatLng(currentLocation);
                    vehicle.vehicleCurrentPosition = _.get(currentLocation, "_id");
                } else {
                    delete vehicle.vehicleCurrentPosition;
                }
                vehicleAddress = await addressRepository.createAddress(vehicleAddress);
                vehicle.vehicleLocation = _.get(vehicleAddress, '_id');
                vehicle.vehicleOwner = _.get(user, '_id');
                return await vehicleRepository.createVehicle(vehicle);
            }
        }
        throw new Error("Vehicle or User Information is incorrect!");
    }

    /**
     * this method is used to get all the vehicles of a user
     * @param userId the usedId of the owner
     * @returns {Promise<*>} the promise containing the list of vehicles owned by the user.
     */
    async getVehiclesForUser(userId) {
        return await vehicleRepository.getVehiclesForUser(userId);
    }

    /**
     * this method is used to delete the vehicle by a given id
     * @param id the id of the vehicle to be deleted
     * @returns {Promise<{id, deletedStatus: string}>} the promise containing the deleted status.
     */
    async deleteById(id) {
        const vehicle = await vehicleRepository.findbyId(id);
        await latLngRepository.deleteOne(vehicle.vehicleCurrentPosition._id);
        await addressRepository.deleteAddress(vehicle.vehicleLocation._id);
        return await vehicleRepository.deleteById(vehicle._id);
    }

    /**
     * this method is used to update a given vehicle.
     * @param vehicle the vehicle document containing the updates
     * @returns {Promise<*>} the promise containing the updated vehicle document.
     */
    async updateVehicle(vehicle) {
        return await vehicleRepository.updateOne(vehicle);
    }

}

/**
 * create a new VehicleService to be exported.
 * @type {VehicleService}
 */
const vehicleService = new VehicleService();

module.exports = {
    vehicleService
}
