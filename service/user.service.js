const _ = require("lodash");
const {userRepository} = require("../repository/user.repository");
const {addressRepository} = require("../repository/address.repository");
const {stateRepository} = require("../repository/state.repository");
const {vehicleRepository} = require("../repository/vehicle.repository");
const {latLngRepository} = require("../repository/latLng.repository");
const {serviceRequestRepository} = require("../repository/serviceRequest.repository");

class UserService {
    constructor() {
    }

    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    async createUser(user) {
        let address = _.get(user, 'address', {});
        if (!_.isEmpty(address)) {
            let state = _.get(address, 'state', {});
            if (!_.isEmpty(state)) {
                let savedState;
                savedState = await stateRepository.getStateBy(_.get(state, 'name'));
                state = _.isEmpty(savedState) ? await stateRepository.createState(state) : savedState;
                address.state = _.get(state, '_id');
            }
            address = await addressRepository.createAddress(address);
            user.address = _.get(address, '_id');
        }
        return await userRepository.createUser(user);
    }

    async updateUser(id, patch) {
        return await userRepository.updateUser(id, patch);
    }

    async deleteUser(userId) {
        const user = await userRepository.findByUserId(userId);
        const address = user.address;
        await addressRepository.deleteAddress(address._id);
        const vehicles = await vehicleRepository.getVehiclesForUser(userId);
        for (const v of vehicles) {
            await latLngRepository.deleteOne(v.vehicleCurrentPosition._id);
            await addressRepository.deleteAddress(v.vehicleLocation._id);
            await vehicleRepository.deleteById(v._id);
        }
        const serviceRequests = await serviceRequestRepository.getServiceRequests({requestedBy: userId});
        for (const s of serviceRequests) {
            await latLngRepository.deleteOne(s.from._id);
            await latLngRepository.deleteOne(s.to._id);
            await serviceRequestRepository.deleteRequestById(s._id);
        }

        return await userRepository.deleteUser(userId);
    }

    async findOne(username) {
        return await userRepository.findByUsername(username);
    }

    async findOneById(id) {
        return await userRepository.findByUserId(id);
    }
}

const userService = new UserService();

module.exports = {
    userService
}
