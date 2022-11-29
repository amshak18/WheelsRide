const {serviceRequestService} = require("../service/serviceRequest.service");

class ServiceController {
    constructor() {
    }

    async createService(body) {
        return await serviceRequestService.createServiceRequest(body);
    }

    async getServiceRequests(filter) {
        return await serviceRequestService.findServiceRequests(filter);
    }

    async updateServiceRequest(filter) {
        return await serviceRequestService.updateServiceRequest(filter);
    }

    async getServiceRequestById(id) {
        return await serviceRequestService.getServiceRequestById(id);
    }

    async deleteServiceRequestById(id) {
        return await serviceRequestService.deleteServiceRequestById(id);
    }
}

const serviceController = new ServiceController();

module.exports = {
    serviceController
}
