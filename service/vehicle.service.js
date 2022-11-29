const _ = require("lodash");
const {vehicleRepository} = require("../repository/vehicle.repository");
const {addressRepository} = require("../repository/address.repository");
const {userRepository} = require("../repository/user.repository");
const {stateRepository} = require("../repository/state.repository");
const {latLngRepository} = require("../repository/latLng.repository");
const {Vehicle} = require("../model/vehicle.model");

class VehicleService {
    constructor() {
    }

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
                }
                else {
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

    async getVehiclesForUser(userId) {
        return await vehicleRepository.getVehiclesForUser(userId);
    }

    async deleteById(id) {
        const vehicle = await vehicleRepository.findbyId(id);
        await latLngRepository.deleteOne(vehicle.vehicleCurrentPosition._id);
        await addressRepository.deleteAddress(vehicle.vehicleLocation._id);
        return await vehicleRepository.deleteById(vehicle._id);
    }

    async updateVehicle(vehicle) {
        return await vehicleRepository.updateOne(vehicle);
    }

}

const vehicleService = new VehicleService();

module.exports = {
    vehicleService
}
