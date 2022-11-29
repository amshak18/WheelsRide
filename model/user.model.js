const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isServiceProvider: Boolean
})

UserSchema.pre('save', async function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(this.password, salt);
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

const User = model('User', UserSchema);

module.exports = {
    User
}
