const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const ServiceSchema = new Schema({
    serviceRequestedDate: Date,
    serviceStatus: String,
    serviceCost: Number,
    serviceType: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceType'
    }
})

const Service = model('Service', ServiceSchema);

module.exports = {
    Service
}
