const mongoose = require("mongoose");
const {Schema, model} = mongoose;

/**
 * create a schema to hold the ServiceRequest information.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {requestedBy: {ref: string, type: ObjectId}, provider: {ref: string, type: ObjectId}, requestorComment: StringConstructor, from: {ref: string, type: ObjectId}, toString: StringConstructor, to: {ref: string, type: ObjectId}, fromString: StringConstructor, requestedDate: DateConstructor, totalCost: NumberConstructor, status: StringConstructor}>}
 */
const ServiceRequestSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'LatLng'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'LatLng'
    },
    fromString: String,
    toString: String,
    requestedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    requestedDate: Date,
    totalCost: Number,
    status: String,
    requestorComment: String
})

/**
 * create a model from the ServiceRequestSchema
 * @type {Model<InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {requestedBy: {ref: string, type: ObjectId}, provider: {ref: string, type: ObjectId}, requestorComment: StringConstructor, from: {ref: string, type: ObjectId}, toString: StringConstructor, to: {ref: string, type: ObjectId}, fromString: StringConstructor, requestedDate: DateConstructor, totalCost: NumberConstructor, status: StringConstructor}>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {requestedBy: {ref: string, type: ObjectId}, provider: {ref: string, type: ObjectId}, requestorComment: StringConstructor, from: {ref: string, type: ObjectId}, toString: StringConstructor, to: {ref: string, type: ObjectId}, fromString: StringConstructor, requestedDate: DateConstructor, totalCost: NumberConstructor, status: StringConstructor}>, "TQueryHelpers">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {requestedBy: {ref: string, type: ObjectId}, provider: {ref: string, type: ObjectId}, requestorComment: StringConstructor, from: {ref: string, type: ObjectId}, toString: StringConstructor, to: {ref: string, type: ObjectId}, fromString: StringConstructor, requestedDate: DateConstructor, totalCost: NumberConstructor, status: StringConstructor}>, "TInstanceMethods">, {}, module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {requestedBy: {ref: string, type: ObjectId}, provider: {ref: string, type: ObjectId}, requestorComment: StringConstructor, from: {ref: string, type: ObjectId}, toString: StringConstructor, to: {ref: string, type: ObjectId}, fromString: StringConstructor, requestedDate: DateConstructor, totalCost: NumberConstructor, status: StringConstructor}>> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {requestedBy: {ref: string, type: ObjectId}, provider: {ref: string, type: ObjectId}, requestorComment: StringConstructor, from: {ref: string, type: ObjectId}, toString: StringConstructor, to: {ref: string, type: ObjectId}, fromString: StringConstructor, requestedDate: DateConstructor, totalCost: NumberConstructor, status: StringConstructor}>, "TStaticMethods">}
 */
const ServiceRequest = model('ServiceRequest', ServiceRequestSchema);

module.exports = {
    ServiceRequest
}
