const {connect, disconnect} = require("../util/db.config");
const {State} = require("../model/state.model");

/**
 * this is the data access class for the State class.
 */
class StateRepository {
    /**
     * Construct the repository by connecting to the database.
     */
    constructor() {
        connect();
    }

    /**
     * this method is used to get a state by its name
     * @param name the name of the state
     * @return {Promise<*>} the promise containing the state document.
     */
    async getStateBy(name) {
        return State.findOne({name: name});
    }

    /**
     * this method is used to create a new state
     * @param state the state document
     * @return {Promise<{}>} the promise containing the created state document.
     */
    async createState(state) {
        let createdState = {};
        try {
            createdState = await State.create(state);
        } catch (e) {
            console.log(e)
        }

        return createdState;
    }

    /**
     * this method is used to delete a state by its name
     * @param name the name of the state
     * @return {Promise<{name, deletedStatus: boolean}>} the Promise containing the status of the deletion.
     */
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

/**
 * create a new StateRepository to be exported.
 * @type {StateRepository}
 */
const stateRepository = new StateRepository();

module.exports = {
    stateRepository
}
