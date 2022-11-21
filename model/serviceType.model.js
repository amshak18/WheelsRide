const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const ServiceTypeSchema = new Schema({
    name: String
})

const ServiceType = model('ServiceType', ServiceTypeSchema);

module.exports = {
    ServiceType
}
