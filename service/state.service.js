const {stateRepository} = require("../repository/state.repository")

class StateService {
    constructor() {
    }

    async getStateBy(name) {
        return await stateRepository.getStateBy(name);
    }

    async createState(state) {
        return await stateRepository.createState(state);
    }

    async deleteState(name) {
        return await stateRepository.deleteStateBy(name)
    }
}

const stateService = new StateService();

module.exports = {
    stateService
}
