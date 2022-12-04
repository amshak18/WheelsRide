const {connect, disconnect} = require("../util/db.config");
const {LatLng} = require("../model/latLng.model");

/**
 * this is the data access class for the LatLng class.
 */
class LatLngRepository {
    /**
     * Construct the repository by connecting to the database.
     */
    constructor() {
        connect();
    }

    /**
     * this method will create a new LatLng document in the LatLng collection.
     * @param latLng the LatLng document to be created
     * @return {Promise<{}>} the promise containing the created LatLng document.
     */
    async createLatLng(latLng) {
        let createdLatLng = {};
        try {
            createdLatLng = await LatLng.create(latLng);
        } catch (e) {
            console.log(e)
        }

        return createdLatLng;
    }

    /**
     * this method deletes a LatLng Document by its id
     * @param id the LatLng document.
     * @return {Promise<{id, deletedStatus: string}>} the promise containing the deleted status of the document.
     */
    async deleteOne(id) {
        let deletedLatLng = {};
        try {
            deletedLatLng = await LatLng.deleteOne({_id: id});
        } catch (e) {
            console.log(e)
        }

        return {
            id,
            deletedStatus: `${deletedLatLng.deletedCount > 0}`
        }
    }
}

/**
 * create a new LatLngRepository to be exported
 * @type {LatLngRepository}
 */
const latLngRepository = new LatLngRepository();

module.exports = {
    latLngRepository
}
