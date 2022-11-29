const {connect, disconnect} = require("../util/db.config");
const {LatLng} = require("../model/latLng.model");

class LatLngRepository {
    constructor() {
        connect();
    }

    async createLatLng(latLng) {
        let createdLatLng = {};
        try {
            createdLatLng = await LatLng.create(latLng);
        } catch (e) {
            console.log(e)
        }

        return createdLatLng;
    }

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

const latLngRepository = new LatLngRepository();

module.exports = {
    latLngRepository
}
