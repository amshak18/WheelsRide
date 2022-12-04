const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const bcrypt = require('bcryptjs');

/**
 * create a schema to store the User information.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {firstName: StringConstructor, lastName: StringConstructor, password: {type: StringConstructor, required: boolean}, phoneNumber: {unique: boolean, type: NumberConstructor, required: boolean}, address: {ref: string, type: ObjectId}, isServiceProvider: BooleanConstructor, emailId: {unique: boolean, type: StringConstructor, required: boolean}, username: {unique: boolean, type: StringConstructor, required: boolean}}>}
 */
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

/**
 * before saving a user, generate a new hash for the password if the password id modified.
 */
UserSchema.pre('save', async function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(this.password, salt);
    } else {
        return next();
    }
});

/**
 * add a method to the UserSchema to compare the passwords.
 * @param password the password the user enetered
 * @param cb the callback function.
 */
UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

/**
 * create a model form the UserSchema
 * @type {Model<InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {firstName: StringConstructor, lastName: StringConstructor, password: {type: StringConstructor, required: boolean}, phoneNumber: {unique: boolean, type: NumberConstructor, required: boolean}, address: {ref: string, type: ObjectId}, isServiceProvider: BooleanConstructor, emailId: {unique: boolean, type: StringConstructor, required: boolean}, username: {unique: boolean, type: StringConstructor, required: boolean}}>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {firstName: StringConstructor, lastName: StringConstructor, password: {type: StringConstructor, required: boolean}, phoneNumber: {unique: boolean, type: NumberConstructor, required: boolean}, address: {ref: string, type: ObjectId}, isServiceProvider: BooleanConstructor, emailId: {unique: boolean, type: StringConstructor, required: boolean}, username: {unique: boolean, type: StringConstructor, required: boolean}}>, "TQueryHelpers">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {firstName: StringConstructor, lastName: StringConstructor, password: {type: StringConstructor, required: boolean}, phoneNumber: {unique: boolean, type: NumberConstructor, required: boolean}, address: {ref: string, type: ObjectId}, isServiceProvider: BooleanConstructor, emailId: {unique: boolean, type: StringConstructor, required: boolean}, username: {unique: boolean, type: StringConstructor, required: boolean}}>, "TInstanceMethods">, {}, module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {firstName: StringConstructor, lastName: StringConstructor, password: {type: StringConstructor, required: boolean}, phoneNumber: {unique: boolean, type: NumberConstructor, required: boolean}, address: {ref: string, type: ObjectId}, isServiceProvider: BooleanConstructor, emailId: {unique: boolean, type: StringConstructor, required: boolean}, username: {unique: boolean, type: StringConstructor, required: boolean}}>> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {firstName: StringConstructor, lastName: StringConstructor, password: {type: StringConstructor, required: boolean}, phoneNumber: {unique: boolean, type: NumberConstructor, required: boolean}, address: {ref: string, type: ObjectId}, isServiceProvider: BooleanConstructor, emailId: {unique: boolean, type: StringConstructor, required: boolean}, username: {unique: boolean, type: StringConstructor, required: boolean}}>, "TStaticMethods">}
 */
const User = model('User', UserSchema);

module.exports = {
    User
}
