const {userService} = require("../service/user.service")

class UserController {
    constructor() {
    }

    async getAllUsers() {
        return await userService.getAllUsers();
    }

    async createUser(user) {
        return await userService.createUser(user);
    }

    async updateUser(id, patch) {
        return await userService.updateUser(id, patch);
    }

    async deleteUser(id) {
        return await userService.deleteUser(id);
    }

    async findOne(username) {
        return await userService.findOne(username);
    }

    async findOneById(id) {
        return await userService.findOneById(id);
    }
}

const userController = new UserController();

module.exports = {
    userController
}
