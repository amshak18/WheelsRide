const mongoose = require("mongoose");
const {Schema, model} = mongoose;

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

const ServiceRequest = model('ServiceRequest', ServiceRequestSchema);

module.exports = {
    ServiceRequest
}
