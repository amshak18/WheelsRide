const express = require('express');
const passport = require('passport')
const {userController} = require('../controller/user.controller')
const router = express.Router();
const {authConfig} = require('../util/passport.config');
const {getToken} = require('../util/httpRequest.util');

authConfig(passport);

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        userController.getAllUsers().then(users => res.json(users))
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }

});

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        const id = req.params.id;
        userController.findOneById(id).then(user => res.json(user)).catch(error => res.status(404).json({
            success: false,
            message: 'No user found!'
        }))
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }

});

router.patch('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        let patch = req.body;
        const id = req.params.id;
        userController.updateUser(id, patch).then(user => {
            res.status(200).json(user);
        })
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }
});

router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        let body = req.body;
        const id = req.params.id;
        userController.updateUser(id, body).then(user => {
            res.status(200).json(user);
        })
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if (token) {
        const id = req.params.id;
        userController.deleteUser(id).then(deletedUser => {
            res.status(200).json(deletedUser);
        })
    } else {
        res.status(403).json({
            success: false, message: 'You are not authorized!'
        })
    }
});

module.exports = router;
