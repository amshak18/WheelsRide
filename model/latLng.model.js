const mongoose = require("mongoose");
const {Schema, model} = mongoose;

/**
 * create a schema to hold the Latitude and Longitude information.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {lng: NumberConstructor, lat: NumberConstructor}>}
 */
const LatLngSchema = new Schema({
    lat: Number,
    lng: Number
})

/**
 * create a model from the LatLngSchema
 * @type {Model<InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {lng: NumberConstructor, lat: NumberConstructor}>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {lng: NumberConstructor, lat: NumberConstructor}>, "TQueryHelpers">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {lng: NumberConstructor, lat: NumberConstructor}>, "TInstanceMethods">, {}, module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {lng: NumberConstructor, lat: NumberConstructor}>> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {lng: NumberConstructor, lat: NumberConstructor}>, "TStaticMethods">}
 */
const LatLng = model('LatLng', LatLngSchema);

module.exports = {
    LatLng
}
