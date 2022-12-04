const {connect, disconnect} = require("../util/db.config");
const {Vehicle} = require("../model/vehicle.model");

/**
 * this is the data access class for the Vehicle class.
 */
class VehicleRepository {
    /**
     * Construct the repository by connecting to the database.
     */
    constructor() {
        connect();
    }

    /**
     * this method us used to get all the vehicle documents for the user.
     * @param userId the userid of the owner
     * @returns {Promise<*>} the promise containing the list of vehicles owned by the user.
     */
    async getVehiclesForUser(userId) {
        return Vehicle.find({vehicleOwner: userId})
            .populate([
                {
                    path: 'vehicleLocation',
                    model: 'Address',
                    populate: {
                        path: 'state',
                        model: 'State'
                    }
                },
                {
                    path: 'vehicleCurrentPosition',
                    model: 'LatLng'
                },
                {
                    path: 'vehicleOwner',
                    model: 'User',
                    populate: {
                        path: 'address',
                        model: 'Address',
                        populate: {
                            path: 'state',
                            model: 'State'
                        }
                    }
                }]);
    }

    /**
     * This method is used to create a vehicle
     * @param vehicle the vehicle document that needs to be added to the collection.
     * @returns {Promise<*>} the promise containing the created vehicle document
     */
    async createVehicle(vehicle) {
        let createdVehicle = {};
        try {
            createdVehicle = await Vehicle.create(vehicle);
        } catch (e) {
            console.log(e)
            throw e;
        }

        return createdVehicle
            .populate([
                {
                    path: 'vehicleLocation',
                    model: 'Address',
                    populate: {
                        path: 'state',
                        model: 'State'
                    }
                },
                {
                    path: 'vehicleOwner',
                    model: 'User',
                    populate: {
                        path: 'address',
                        model: 'Address',
                        populate: {
                            path: 'state',
                            model: 'State'
                        }
                    }
                }]);
    }

    /**
     * this method is used to delete the vehicle document from the collection.
     * @param id the id of the vehicle to be deleted.
     * @returns {Promise<{id, deletedStatus: string}>} the promise containing the deletion status.
     */
    async deleteById(id) {
        let deletedVehicle = {};
        try {
            deletedVehicle = await Vehicle.deleteOne({_id: id});
        } catch (e) {
            console.log(e)
        }

        return {
            id,
            deletedStatus: `${deletedVehicle.deletedCount > 0}`
        }
    }

    /**
     * this method is used to find a vehicle document with the given id
     * @param id the id of the vehicle to be found
     * @returns {Promise<*>} the promise containing the vehicle document.
     */
    async findbyId(id) {
        let foundVehicle = {};
        try {
            foundVehicle = await Vehicle.findById(id).populate([
                {
                    path: 'vehicleLocation',
                    model: 'Address',
                    populate: {
                        path: 'state',
                        model: 'State'
                    }
                },
                {
                    path: 'vehicleCurrentPosition',
                    model: 'LatLng'
                },
                {
                    path: 'vehicleOwner',
                    model: 'User',
                    populate: {
                        path: 'address',
                        model: 'Address',
                        populate: {
                            path: 'state',
                            model: 'State'
                        }
                    }
                }]);
        } catch (error) {
            console.log(error);
            throw error;
        }

        return foundVehicle;
    }

    /**
     * this method is used to update a vehicle document
     * @param vehicle the vehicle document containing the updates
     * @returns {Promise<*>} the promise containing the updated vehicle document
     */
    async updateOne(vehicle) {
        let updatedVehicle = {};
        try {
            updatedVehicle = await Vehicle.findByIdAndUpdate({_id: vehicle._id}, vehicle, {new: true}).populate([
                {
                    path: 'vehicleLocation',
                    model: 'Address',
                    populate: {
                        path: 'state',
                        model: 'State'
                    }
                },
                {
                    path: 'vehicleCurrentPosition',
                    model: 'LatLng'
                },
                {
                    path: 'vehicleOwner',
                    model: 'User',
                    populate: {
                        path: 'address',
                        model: 'Address',
                        populate: {
                            path: 'state',
                            model: 'State'
                        }
                    }
                }]);
        } catch (error) {
            console.log(error);
            throw error;
        }

        return updatedVehicle;
    }
}

/**
 * create a new VehicleRepository to be exported.
 * @type {VehicleRepository}
 */
const vehicleRepository = new VehicleRepository();

module.exports = {
    vehicleRepository
}
