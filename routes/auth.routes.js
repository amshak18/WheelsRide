const _ = require('lodash');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {userController} = require('../controller/user.controller');
const config = require('config');

/**
 * router method to handle HTTP POST to the /login endpoint.
 */
router.post('/login', (req, res, next) => {
    let body = req.body;
    if (!body.username || !body.password) {
        res.status(400).json({
            success: false,
            message: 'Please provide both username and password for authentication!'
        });
    } else {
        userController.findOne(body.username).then(user => {
            if (_.isEmpty(user)) {
                res.status(401).json({
                    success: false,
                    message: 'No such user found!'
                });
            } else {
                user.comparePassword(body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        const jwtToken = jwt.sign(user.toJSON(), _.get(config.get('auth'), 'secret'));
                        res.status(200).json({
                            success: true,
                            token: `JWT ${jwtToken}`,
                            user
                        })
                    } else {
                        if (err) {
                            console.log(err);
                        }
                        res.status(401).json({
                            success: false,
                            message: 'Wrong username or password!'
                        })
                    }
                })
            }
        })
    }
});
/**
 * router method to handle HTTP POST to the /signup endpoint.
 */
router.post('/signup', (req, res, next) => {
    const user = req.body;
    if (!user.username || !user.password) {
        res.status(400).json({
            success: false,
            message: 'Please provide both username and password for authentication!'
        });
    } else {
        userController.createUser(user).then(user => {
            res.status(201).json(user)
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: 'Username already exists!'
            })
        })
    }
})

module.exports = router;
