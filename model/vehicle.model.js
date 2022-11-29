const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const VehicleSchema = new Schema({
    vin: {
        type: String,
        unique: true,
        required: true,
    },
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
    vehicleCurrentPosition: {
        type: Schema.Types.ObjectId,
        ref: 'LatLng'
    },
    vehicleOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

VehicleSchema.path('vin').validate(function (vin) {
    return vin.length === 17;
})

const Vehicle = model('Vehicle', VehicleSchema);

module.exports = {
    Vehicle
}
