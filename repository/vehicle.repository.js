const {connect, disconnect} = require("../util/db.config");
const {Vehicle} = require("../model/vehicle.model");

class VehicleRepository {
    constructor() {
        connect();
    }

    async getAllVehicles() {
        return Vehicle.find()
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

const vehicleRepository = new VehicleRepository();

module.exports = {
    vehicleRepository
}
