const {connect, disconnect} = require("../util/db.config");
const {ServiceRequest} = require("../model/serviceRequest.model");
const _ = require("lodash");

class ServiceRequestRepository {
    constructor() {
        connect();
    }

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

    async deleteRequestById(id) {
        return ServiceRequest.findByIdAndDelete({_id: id});
    }
}

const serviceRequestRepository = new ServiceRequestRepository();

module.exports = {
    serviceRequestRepository
}
