const _ = require("lodash");
const {userRepository} = require("../repository/user.repository");
const {serviceRequestRepository} = require("../repository/serviceRequest.repository");
const {latLngRepository} = require("../repository/latLng.repository");

class ServiceRequestService {
    constructor() {
    }

    async findServiceRequests(filter) {
        return await serviceRequestRepository.getServiceRequests(filter);
    }

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

    async updateServiceRequest(filter) {
        return await serviceRequestRepository.updateServiceRequest(filter);
    }

    async getServiceRequestById(id) {
        return await serviceRequestRepository.getRequestById(id);
    }

    async deleteServiceRequestById(id){
        return await serviceRequestRepository.deleteRequestById(id)
;    }

}

const serviceRequestService = new ServiceRequestService();

module.exports = {
    serviceRequestService
}
