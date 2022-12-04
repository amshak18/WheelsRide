const {serviceRequestService} = require("../service/serviceRequest.service");

/**
 * This is the controller used to control the service requests.
 */
class ServiceController {
    constructor() {
    }

    /**
     * This is used to create a service request by making use of the serviceRequestService
     * @param body the body containing the userid and the serviceRequest.
     * @return {Promise<*|undefined>} a promise containing the response (created serviceRequest).
     */
    async createService(body) {
        return await serviceRequestService.createServiceRequest(body);
    }

    /**
     * This is used to fetch all the service requests for a given filter.
     * @param filter the object that contains all the filters.
     * @return {Promise<{}>} the promise that contains the list of all the service requests that matches the filter
     */
    async getServiceRequests(filter) {
        return await serviceRequestService.findServiceRequests(filter);
    }

    /**
     * this is used to update a service request with the patch.
     * @param filter the patch of the service request
     * @return {Promise<*>} the promise containing the ServiceRequest.
     */
    async updateServiceRequest(filter) {
        return await serviceRequestService.updateServiceRequest(filter);
    }

    /**
     * returns a service request for a given id
     * @param id the id of the serviceRequest
     * @return {Promise<*>} the promise that contains the serviceRequest.
     */
    async getServiceRequestById(id) {
        return await serviceRequestService.getServiceRequestById(id);
    }

    /**
     * delete a service request for a given id
     * @param id the id of the service request to be deleted
     * @return {Promise<*>} the promise containing the status of deletion
     */
    async deleteServiceRequestById(id) {
        return await serviceRequestService.deleteServiceRequestById(id);
    }
}

const serviceController = new ServiceController();

module.exports = {
    serviceController
}
