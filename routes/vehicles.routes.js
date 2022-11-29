const express = require('express');
const {vehicleController} = require('../controller/vehicle.controller')
const passport = require("passport");
const router = express.Router();
const {getToken} = require('../util/httpRequest.util');

/* GET users listing. */
router.post('/register', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    const body = req.body
    if (token) {
        vehicleController.createVehicle(body).then(
            (vehicle) => {
                res.status(201).json(vehicle);
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

router.get('/user/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        const id = req.params.id;
        vehicleController.getVehiclesForUser(id).then(
            (vehicles) => {
                res.status(200).json(vehicles);
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

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const token = getToken(req.headers);
    if (token) {
        const id = req.params.id;
        vehicleController.deleteVehicleById(id).then(
            (response) => {
                res.status(200).json(response);
            },
            (error) => {
                res.status(400).json({success: false, message: error.message})
            }
        )
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        });
    }
})

router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const token = getToken(req.headers);
    if (token) {
        const body = req.body;
        vehicleController.updateVehicle(body).then(
            (response) => {
                res.status(200).json(response);
            },
            (error) => {
                res.status(400).json({success: false, message: error.message})
            }
        )
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        });
    }
})

module.exports = router;
