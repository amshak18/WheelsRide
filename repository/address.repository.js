const {connect, disconnect} = require("../util/db.config");
const {Address} = require("../model/address.model");

/**
 * this is the data access class for the Address class.
 */
class AddressRepository {
    /**
     * Construct the repository by connecting to the database.
     */
    constructor() {
        connect();
    }

    /**
     * this method will query the Address collection with the filter for the id
     * and fetches the address matching the given id.
     * @param id the id of the address
     * @return {Promise<*>} the promise containing the Address document.
     */
    async getAddressBy(id) {
        const address = await Address.find({_id: id})
            .populate({
                path: 'state',
                model: 'State'
            });

        return address;
    }

    /**
     * this method is used to create a document in the Address collection
     * @param address the address document
     * @return {Promise<{}>} the promise containing the created address
     */
    async createAddress(address) {
        let createdAddress = {};
        try {
            createdAddress = await Address.create(address);
        } catch (e) {
            console.log(e)
        }

        return createdAddress;
    }

    /**
     * this method updates the address document
     * @param address the document containing the updates
     * @return {Promise<{}>} the promise containing the updated document.
     */
    async updateAddress(address) {
        let updatedAddress = {};
        try {
            updatedAddress = await Address.updateOne(address);
        } catch (e) {
            console.log(e)
        }
        return updatedAddress;
    }

    /**
     * this method deletes the address by a given id.
     * @param addressId the id of the address to be deleted
     * @return {Promise<{deletedAddress: {}, deletedStatus: string}>} the promise containing the deleted status of the address
     */
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

/**
 * create a new address repository to be exported
 * @type {AddressRepository}
 */
const addressRepository = new AddressRepository();

module.exports = {
    addressRepository
}
