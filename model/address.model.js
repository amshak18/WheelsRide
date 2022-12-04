const mongoose = require("mongoose");
const {Schema, model} = mongoose;

/**
 * Create a new Schema to hold the address
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {city: StringConstructor, streetAddress1: StringConstructor, streetAddress2: StringConstructor, state: {ref: string, type: ObjectId}}>}
 */
const AddressSchema = new Schema({
    streetAddress1: String,
    streetAddress2: String,
    city: String,
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    }
})

/**
 * create a model from the AddressSchema
 * @type {Model<InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {city: StringConstructor, streetAddress1: StringConstructor, streetAddress2: StringConstructor, state: {ref: string, type: ObjectId}}>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {city: StringConstructor, streetAddress1: StringConstructor, streetAddress2: StringConstructor, state: {ref: string, type: ObjectId}}>, "TQueryHelpers">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {city: StringConstructor, streetAddress1: StringConstructor, streetAddress2: StringConstructor, state: {ref: string, type: ObjectId}}>, "TInstanceMethods">, {}, module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {city: StringConstructor, streetAddress1: StringConstructor, streetAddress2: StringConstructor, state: {ref: string, type: ObjectId}}>> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {city: StringConstructor, streetAddress1: StringConstructor, streetAddress2: StringConstructor, state: {ref: string, type: ObjectId}}>, "TStaticMethods">}
 */
const Address = model('Address', AddressSchema);

module.exports = {
    Address
}
