const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    emailId: String,
    phoneNumber: Number
})
