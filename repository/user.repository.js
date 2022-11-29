const {connect, disconnect} = require("../util/db.config");
const {User} = require("../model/user.model");

class UserRepository {
    constructor() {
        connect();
    }

    async getAllUsers() {
        return User.find().populate({
            path: 'address',
            model: 'Address',
            populate: {
                path: 'state',
                model: 'State'
            }
        });
    }

    async createUser(user) {
        let createdUser = {};
        try {
            createdUser = await User.create(user);
        } catch (e) {
            console.log(e)
            throw e;
        }

        return createdUser.populate({
            path: 'address',
            model: 'Address',
            populate: {
                path: 'state',
                model: 'State'
            }
        });
    }

    async updateUser(id, patch) {
        let updatedUser = {};
        try {
            updatedUser = await User.findByIdAndUpdate(
                {_id: id},
                patch,
                {new: true}
            );

        } catch (e) {
            console.log(e)
        }
        return updatedUser.populate({
            path: 'address',
            model: 'Address',
            populate: {
                path: 'state',
                model: 'State'
            }
        });
    }

    async deleteUser(userId) {
        let deletedUser = {};
        try {
            deletedUser = await User.deleteOne({_id: userId});
        } catch (e) {
            console.log(e)
        }

        return {
            userId,
            deletedStatus: `${deletedUser.deletedCount > 0}`
        }
    }

    async findByUsername(username) {
        let foundUser = {};
        try {
            foundUser = await User.findOne({username: username}).populate({
                path: 'address',
                model: 'Address',
                populate: {
                    path: 'state',
                    model: 'State'
                }
            });
        } catch (e) {
            console.log(e)
        }
        return foundUser
    }

    async findByUserId(id) {
        let foundUser = {};
        try {
            foundUser = await User.findOne({_id: id})
        } catch (e) {
            console.log(e)
        }
        return foundUser.populate({
            path: 'address',
            model: 'Address',
            populate: {
                path: 'state',
                model: 'State'
            }
        });
    }
}

const userRepository = new UserRepository();

module.exports = {
    userRepository
}
