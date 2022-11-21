const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const AddressSchema = new Schema({
    streetAddress1: String,
    streetAddress2: String,
    city: String,
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    }
})

const Address = model('Address', AddressSchema);

module.exports = {
    Address
}
