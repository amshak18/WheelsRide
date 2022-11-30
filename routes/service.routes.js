const express = require('express');
const {serviceController} = require('../controller/service.controller')
const passport = require("passport");
const router = express.Router();
const {getToken} = require('../util/httpRequest.util');
const _ = require("lodash");

/* GET users listing. */
router.post('/request', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    const body = req.body
    if (token) {
        serviceController.createService(body).then(
            (serviceRequest) => {
                res.status(201).json(serviceRequest);
            },
            (error) => {
                console.log(error);
                res.status(400).json({
                    success: false, message: error.message
                })
            });
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }

});

router.get('/request/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        const id = req.params.id;
        serviceController.getServiceRequestById(id).then(
            (serviceRequest) => {
                res.status(200).json(serviceRequest);
            },
            (error) => {
                res.status(404).json({
                    success: false,
                    message: "No requests found!"
                })
            }
        )
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }

});

router.patch('/request/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        const filter = req.body;
        serviceController.updateServiceRequest(filter).then(
            (serviceRequest) => {
                res.status(200).json(serviceRequest);
            },
            (error) => {
                res.status(400).json({
                    success: false,
                    message: error.message
                })
            })
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }

});

router.delete('/request/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        const id = req.params.id;
        serviceController.deleteServiceRequestById(id).then(
            (serviceRequest) => {
                res.status(200).json(serviceRequest);
            },
            (error) => {
                res.status(400).json({
                    success: false,
                    message: error.message
                })
            })
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }

});

router.get('/request', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const token = getToken(req.headers)
    if (token) {
        const params = req.params;
        let filter = {};
        if (req.query.status) {
            _.extend(filter, {status: req.query.status})
        }
        if (req.query.provider) {
            _.extend(filter, {provider: req.query.provider});
        }
        if(req.query.requestedBy) {
            _.extend(filter, {requestedBy: req.query.requestedBy});
        }
        serviceController.getServiceRequests(filter).then((serviceRequests) => {
            res.status(200).json(serviceRequests);
        }, (error) => {
            res.status(400).json({
                success: false,
                message: error.message
            })
        })

    }
});

module.exports = router;
