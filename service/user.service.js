const _ = require("lodash");
const {userRepository} = require("../repository/user.repository");
const {addressRepository} = require("../repository/address.repository");
const {stateRepository} = require("../repository/state.repository");
const {vehicleRepository} = require("../repository/vehicle.repository");
const {latLngRepository} = require("../repository/latLng.repository");
const {serviceRequestRepository} = require("../repository/serviceRequest.repository");

/**
 * This is a service used to serve /user endpoints
 */
class UserService {
    constructor() {
    }

    /**
     * this method is used to get all the users.
     * @returns {Promise<User[]>} the promise containing a list of all the users.
     */
    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    /**
     * this method is used to create a new user
     * @param user the user document to be created
     * @returns {Promise<*>} the promise containing the created user document.
     */
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

    /**
     * this method is used to update a user.
     * @param id the id of the user
     * @param patch the patch containing the updates to the user
     * @returns {Promise<*>} the promise containing the updated user document.
     */
    async updateUser(id, patch) {
        return await userRepository.updateUser(id, patch);
    }

    /**
     * this method is used to delete a user
     * @param userId the id of the user to be deleted
     * @returns {Promise<{userId, deletedStatus: string}>} the promise containing the deletion status of the user.
     */
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

    /**
     * this method is used to find the user by their username
     * @param username the username of the user
     * @returns {Promise<{}>} the promise containing the found user document.
     */
    async findOne(username) {
        return await userRepository.findByUsername(username);
    }

    /**
     * this method is used to find a user by their userid
     * @param id the id of the user
     * @returns {Promise<*>} the promise containing the found user document.
     */
    async findOneById(id) {
        return await userRepository.findByUserId(id);
    }
}

/**
 * create a new UserService to be exported.
 * @type {UserService}
 */
const userService = new UserService();

module.exports = {
    userService
}
