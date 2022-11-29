const {addressRepository} = require("../repository/address.repository")

class AddressService {
    constructor() {
    }

    async getAddressBy(id) {
        return await addressRepository.getAddressBy(id);
    }

    async createAddress(address) {
        return await addressRepository.createAddress(address);
    }

    async updateAddress(address) {
        return await addressRepository.updateAddress(address);
    }

    async deleteAddress(id) {
        return await addressRepository.deleteAddress(id)
    }

}

const addressService = new AddressService();

module.exports = {
    addressService
}
