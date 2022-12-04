const {userService} = require("../service/user.service")

/**
 * The controller to control all the user related functionalities.
 */
class UserController {
    constructor() {
    }

    /**
     * gets all the users
     * @return {Promise<*>} the promise containing the list of all the users.
     */
    async getAllUsers() {
        return await userService.getAllUsers();
    }

    /**
     * used to create a new user
     * @param user the user object containing all the user information.
     * @return {Promise<*>} the promise containing the created user object.
     */
    async createUser(user) {
        return await userService.createUser(user);
    }

    /**
     * used to update the user with the updated information provided in the patch
     * @param id the id of the user to be updated
     * @param patch the patch containing the updated to the user
     * @return {Promise<*>} the promise containing the updated user.
     */
    async updateUser(id, patch) {
        return await userService.updateUser(id, patch);
    }

    /**
     * The method used to delete the user by a given id
     * @param id the id of the user to be deleted.
     * @return {Promise<{userId: *, deletedStatus: string}>} the promise containing the deletion status of the user.
     */
    async deleteUser(id) {
        return await userService.deleteUser(id);
    }

    /**
     * the method used to find a user by the username
     * @param username the username to find
     * @return {Promise<*>} the promise containing the user object.
     */
    async findOne(username) {
        return await userService.findOne(username);
    }

    /**
     * the method used to find a user by the id
     * @param id the id of the user
     * @return {Promise<*>} the promise containing the user object.
     */
    async findOneById(id) {
        return await userService.findOneById(id);
    }
}

const userController = new UserController();

module.exports = {
    userController
}
