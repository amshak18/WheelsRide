const mongoose = require("mongoose");
const {Schema, model} = mongoose;

/**
 * Create a schema to hold the State information.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {country: StringConstructor, name: StringConstructor}>}
 */
const StateSchema = new Schema({
    name: String,
    country: String
})

/**
 * create a model from the StateSchema
 * @type {Model<InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {country: StringConstructor, name: StringConstructor}>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {country: StringConstructor, name: StringConstructor}>, "TQueryHelpers">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {country: StringConstructor, name: StringConstructor}>, "TInstanceMethods">, {}, module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {country: StringConstructor, name: StringConstructor}>> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {country: StringConstructor, name: StringConstructor}>, "TStaticMethods">}
 */
const State = model('State', StateSchema);

module.exports = {
    State
}
