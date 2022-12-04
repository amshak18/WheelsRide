const {connect, disconnect} = require("../util/db.config");
const {ServiceRequest} = require("../model/serviceRequest.model");
const _ = require("lodash");

/**
 * this is the data access class for the ServiceRequest class.
 */
class ServiceRequestRepository {
    /**
     * Construct the repository by connecting to the database.
     */
    constructor() {
        connect();
    }

    /**
     * This method is used to update the service request with the given patch.
     * @param filter the filter object containing the patch to update the document
     * @return {Promise<*>} the promise containing the updated ServiceRequest document.
     */
    async updateServiceRequest(filter) {
        let updatedServiceRequest = {}
        try {
            updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(
                {_id: filter._id},
                filter,
                {new: true}
            )
        } catch (error) {
            console.log(error);
            throw error;
        }
        return updatedServiceRequest.populate([
            {
                path: 'requestedBy',
                model: 'User',
                populate: {
                    path: 'address',
                    model: 'Address',
                    populate: {
                        path: 'state',
                        model: 'State'
                    }
                }
            },
            {
                path: 'from',
                model: 'LatLng'
            },
            {
                path: 'to',
                model: 'LatLng'
            }
        ])

    }

    /**
     * this method is used to fetch all the service requests that matches the given filter
     * @param filter the filter to select the service requests
     * @return {Promise<{}>} the promise containing the list of ServiceRequests matching the filter.
     */
    async getServiceRequests(filter) {
        let serviceRequests = {}
        try {
            serviceRequests = await ServiceRequest.find(filter).populate([
                {
                    path: 'requestedBy',
                    model: 'User',
                    populate: {
                        path: 'address',
                        model: 'Address',
                        populate: {
                            path: 'state',
                            model: 'State'
                        }
                    }
                },
                {
                    path: 'from',
                    model: 'LatLng'
                },
                {
                    path: 'to',
                    model: 'LatLng'
                },
                {
                    path: 'provider',
                    model: 'User',
                    populate: {
                        path: 'address',
                        model: 'Address',
                        populate: {
                            path: 'state',
                            model: 'State'
                        }
                    }
                },
            ]);
        } catch (error) {
            console.log(error)
        }

        return serviceRequests
    }

    /**
     * this method is used to get a serviceRequest by its id
     * @param id the id of the serviceRequest
     * @return {Promise<*>} the promise containing the ServiceRequest.
     */
    async getRequestById(id) {
        let serviceRequest = {}
        try {
            serviceRequest = await ServiceRequest.findOne({_id: id})
        } catch (error) {
            console.log("error");
            throw error;
        }
        return serviceRequest.populate([
            {
                path: 'requestedBy',
                model: 'User',
                populate: {
                    path: 'address',
                    model: 'Address',
                    populate: {
                        path: 'state',
                        model: 'State'
                    }
                }
            },
            {
                path: 'from',
                model: 'LatLng'
            },
            {
                path: 'to',
                model: 'LatLng'
            },
            {
                path: 'provider',
                model: 'User',
                populate: {
                    path: 'address',
                    model: 'Address',
                    populate: {
                        path: 'state',
                        model: 'State'
                    }
                }
            },
        ]);
    }

    /**
     * this method is used to create a new ServiceRequest
     * @param serviceRequest the service request document that needs to be added to the collection.
     * @return {Promise<*>} the promise containing the created document.
     */
    async createServiceRequest(serviceRequest) {
        let createdServiceRequest = {};
        try {
            createdServiceRequest = await ServiceRequest.create(serviceRequest);
        } catch (e) {
            console.log(e)
        }

        return createdServiceRequest.populate([
            {
                path: 'requestedBy',
                model: 'User',
                populate: {
                    path: 'address',
                    model: 'Address',
                    populate: {
                        path: 'state',
                        model: 'State'
                    }
                }
            },
            {
                path: 'from',
                model: 'LatLng'
            },
            {
                path: 'to',
                model: 'LatLng'
            }
        ]);
    }

    /**
     * This method is used to delete a service request by its id.
     * @param id the id of the service request to be deleted
     * @return {Promise<*>} the promise containing the deleted serviceRequest.
     */
    async deleteRequestById(id) {
        return ServiceRequest.findByIdAndDelete({_id: id});
    }
}

/**
 * create a new ServiceRequestRepository to be exported.
 * @type {ServiceRequestRepository}
 */
const serviceRequestRepository = new ServiceRequestRepository();

module.exports = {
    serviceRequestRepository
}
