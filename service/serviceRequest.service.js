const _ = require("lodash");
const {userRepository} = require("../repository/user.repository");
const {serviceRequestRepository} = require("../repository/serviceRequest.repository");
const {latLngRepository} = require("../repository/latLng.repository");

/**
 * This is a service used to serve /service endpoints
 */
class ServiceRequestService {
    constructor() {
    }

    /**
     * this method is used to find the service requests that match the filter
     * @param filter the filter to match
     * @returns {Promise<{}>} the promise containing the list of service requests
     */
    async findServiceRequests(filter) {
        return await serviceRequestRepository.getServiceRequests(filter);
    }

    /**
     * this method is used to create a service request.
     * this method will call all the required repositories to make sure that the dependent documents are created
     * and then the serviceRequest document is created with the objectId reference to these created references.
     * @param body the body containing the userid and the serviceRequest document.
     * @returns {Promise<*>} the promise containing the created serviceRequest document.
     */
    async createServiceRequest(body) {
        let request = _.get(body, 'service', {});
        let userId = _.get(body, 'userId', '');
        let user;
        if (!_.isEmpty(request) && !_.isEmpty(userId)) {
            let requestFrom = _.get(request, 'from');
            let requestTo = _.get(request, 'to');
            let fromString = _.get(request, 'fromString');
            let toString = _.get(request, 'toString');
            let requestedDate = _.get(request, 'requestedDate');
            user = await userRepository.findByUserId(userId);
            if (!_.isEmpty(requestFrom) && !_.isEmpty(requestTo) && !_.isEmpty(user)) {
                requestFrom = await latLngRepository.createLatLng(requestFrom);
                requestTo = await latLngRepository.createLatLng(requestTo);
                let serviceRequest = {
                    from: _.get(requestFrom, '_id'),
                    to: _.get(requestTo, '_id'),
                    fromString: fromString,
                    toString: toString,
                    requestedBy: _.get(user, '_id'),
                    requestedDate: requestedDate,
                    status: "NEW",
                }

                return await serviceRequestRepository.createServiceRequest(serviceRequest);
            } else {
                throw new Error("Incorrect request details!");
            }
        } else {
            throw new Error("Missing User or Request information!");
        }
    }

    /**
     * this method is used to update a serviceRequest document.
     * @param filter the filter containing the updates
     * @returns {Promise<*>} the promise containing the updates service request document.
     */
    async updateServiceRequest(filter) {
        return await serviceRequestRepository.updateServiceRequest(filter);
    }

    /**
     * the method to get the service request by its id.
     * @param id the id of the service request
     * @returns {Promise<*>} the promise containing the serviceRequest.
     */
    async getServiceRequestById(id) {
        return await serviceRequestRepository.getRequestById(id);
    }

    /**
     * this method is used to delete a serviceRequest by its id.
     * @param id the id if the serviceRequest
     * @returns {Promise<*>} the promise containing the status of the deletion.
     */
    async deleteServiceRequestById(id) {
        return await serviceRequestRepository.deleteRequestById(id);
    }

}

/**
 * create a new ServiceRequestService to be exported.
 * @type {ServiceRequestService}
 */
const serviceRequestService = new ServiceRequestService();

module.exports = {
    serviceRequestService
}
