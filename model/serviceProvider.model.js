const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const ServiceProviderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'ServiceType'
    }]
})

const ServiceProvider = model('ServiceProvider', ServiceProviderSchema);

module.exports = {
    ServiceProvider
}
