const {connect, disconnect} = require("../util/db.config");
const {State} = require("../model/state.model");

class StateRepository {
    constructor() {
        connect();
    }

    async getAllStates() {
        return State.find();
    }

    async getStateBy(name) {
        return State.findOne({name: name});
    }

    async createState(state) {
        let createdState = {};
        try {
            createdState = await State.create(state);
        } catch (e) {
            console.log(e)
        }

        return createdState;
    }

    async deleteStateBy(name) {
        let deletedState = {};
        try {
            deletedState = await State.deleteOne({name: name});
        } catch (e) {
            console.log(e)
        }

        return {
            name,
            deletedStatus: deletedState.deletedCount > 0
        }
    }
}

const stateRepository = new StateRepository();

module.exports = {
    stateRepository
}
