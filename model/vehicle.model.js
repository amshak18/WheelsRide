const mongoose = require("mongoose");
const {Schema, model} = mongoose;

/**
 * create a schema to store the vehicle information.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {vehicleColor: StringConstructor, vehicleSeatingCapacity: NumberConstructor, vehicleLocation: {ref: string, type: ObjectId}, vehicleName: StringConstructor, vehicleCurrentPosition: {ref: string, type: ObjectId}, vehicleOwner: {ref: string, type: ObjectId}, vehicleAvailableSeatingCapacity: NumberConstructor, vehicleCondition: StringConstructor, vin: {unique: boolean, type: StringConstructor, required: boolean}, vehicleLicensePlateNumber: StringConstructor, vehicleMake: StringConstructor}>}
 */
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

/**
 * add a validation to make sure that the vin is always 17 characters.
 */
VehicleSchema.path('vin').validate(function (vin) {
    return vin.length === 17;
})

/**
 * create a model with the VehicleSchema
 * @type {Model<InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {vehicleColor: StringConstructor, vehicleSeatingCapacity: NumberConstructor, vehicleLocation: {ref: string, type: ObjectId}, vehicleName: StringConstructor, vehicleCurrentPosition: {ref: string, type: ObjectId}, vehicleOwner: {ref: string, type: ObjectId}, vehicleAvailableSeatingCapacity: NumberConstructor, vehicleCondition: StringConstructor, vin: {unique: boolean, type: StringConstructor, required: boolean}, vehicleLicensePlateNumber: StringConstructor, vehicleMake: StringConstructor}>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {vehicleColor: StringConstructor, vehicleSeatingCapacity: NumberConstructor, vehicleLocation: {ref: string, type: ObjectId}, vehicleName: StringConstructor, vehicleCurrentPosition: {ref: string, type: ObjectId}, vehicleOwner: {ref: string, type: ObjectId}, vehicleAvailableSeatingCapacity: NumberConstructor, vehicleCondition: StringConstructor, vin: {unique: boolean, type: StringConstructor, required: boolean}, vehicleLicensePlateNumber: StringConstructor, vehicleMake: StringConstructor}>, "TQueryHelpers">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {vehicleColor: StringConstructor, vehicleSeatingCapacity: NumberConstructor, vehicleLocation: {ref: string, type: ObjectId}, vehicleName: StringConstructor, vehicleCurrentPosition: {ref: string, type: ObjectId}, vehicleOwner: {ref: string, type: ObjectId}, vehicleAvailableSeatingCapacity: NumberConstructor, vehicleCondition: StringConstructor, vin: {unique: boolean, type: StringConstructor, required: boolean}, vehicleLicensePlateNumber: StringConstructor, vehicleMake: StringConstructor}>, "TInstanceMethods">, {}, module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {vehicleColor: StringConstructor, vehicleSeatingCapacity: NumberConstructor, vehicleLocation: {ref: string, type: ObjectId}, vehicleName: StringConstructor, vehicleCurrentPosition: {ref: string, type: ObjectId}, vehicleOwner: {ref: string, type: ObjectId}, vehicleAvailableSeatingCapacity: NumberConstructor, vehicleCondition: StringConstructor, vin: {unique: boolean, type: StringConstructor, required: boolean}, vehicleLicensePlateNumber: StringConstructor, vehicleMake: StringConstructor}>> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {vehicleColor: StringConstructor, vehicleSeatingCapacity: NumberConstructor, vehicleLocation: {ref: string, type: ObjectId}, vehicleName: StringConstructor, vehicleCurrentPosition: {ref: string, type: ObjectId}, vehicleOwner: {ref: string, type: ObjectId}, vehicleAvailableSeatingCapacity: NumberConstructor, vehicleCondition: StringConstructor, vin: {unique: boolean, type: StringConstructor, required: boolean}, vehicleLicensePlateNumber: StringConstructor, vehicleMake: StringConstructor}>, "TStaticMethods">}
 */
const Vehicle = model('Vehicle', VehicleSchema);

module.exports = {
    Vehicle
}
