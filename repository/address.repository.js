const {connect, disconnect} = require("../util/db.config");
const {Address} = require("../model/address.model");

class AddressRepository {
    constructor() {
        connect();
    }

    async getAddressBy(id) {
        const address = await Address.find({_id: id})
            .populate({
                path: 'state',
                model: 'State'
            });

        console.log(JSON.stringify(address));

        return address;
    }

    async createAddress(address) {
        let createdAddress = {};
        try {
            createdAddress = await Address.create(address);
        } catch (e) {
            console.log(e)
        }

        return createdAddress;
    }

    async updateAddress(address) {
        let updatedAddress = {};
        try {
            updatedAddress = await Address.updateOne(address);
        } catch (e) {
            console.log(e)
        }
        return updatedAddress;
    }

    async deleteAddress(addressId) {
        let deletedAddress = {};
        try {
            deletedAddress = await Address.deleteOne({_id: addressId});
        } catch (e) {
            console.log(e)
        }

        return {
            deletedAddress,
            deletedStatus: `${deletedAddress.deletedCount > 0}`
        }
    }
}

const addressRepository = new AddressRepository();

module.exports = {
    addressRepository
}
