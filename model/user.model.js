const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    phoneNumber: Number,
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }
})

const User = model('User', UserSchema);

module.exports = {
    User
}
