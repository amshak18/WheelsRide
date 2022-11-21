const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const VehicleSchema = new Schema({
    vin: String,
    vehicleName: String,
    vehicleMake: String,
    vehicleColor: String,
    vehicleSeatingCapacity: Number,
    vehicleAvailableSeatingCapacity: Number,
    vehicleLicensePlateNumber: String,
    vehicleCondition: String,
    vehicleLocation: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    vehicleOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Vehicle = model('Vehicle', VehicleSchema);

module.exports = {
    Vehicle
}
