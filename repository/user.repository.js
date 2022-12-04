const {connect, disconnect} = require("../util/db.config");
const {User} = require("../model/user.model");

/**
 * this is the data access class for the User class.
 */
class UserRepository {
    /**
     * Construct the repository by connecting to the database.
     */
    constructor() {
        connect();
    }

    /**
     * this method is used to get all the users.
     * @return {Promise<User[]>} the promise containing the list of users
     */
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

    /**
     * this method is used to create a new user
     * @param user the user document that needs to be added to the collection.
     * @return {Promise<*>} the promise containing the user document that is added to the collection
     */
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

    /**
     * this method is used to update a user document.
     * @param id the id of the user
     * @param patch the patch containing the updates to the document
     * @return {Promise<*>} the promise containing the updates user document.
     */
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

    /**
     * the method used to delete the user document.
     * @param userId the id of the user to be deleted
     * @return {Promise<{userId, deletedStatus: string}>} the promise containing the status of the deletion.
     */
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

    /**
     * this method is used to find the user by their username
     * @param username the username to be found.
     * @return {Promise<{}>} the promise containing the found user document.
     */
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

    /**
     * this method is used to find user by their id.
     * @param id the id of the user
     * @return {Promise<*>} the promise containing the found user document.
     */
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

/**
 * create a new UserRepository to be exported.
 * @type {UserRepository}
 */
const userRepository = new UserRepository();

module.exports = {
    userRepository
}
