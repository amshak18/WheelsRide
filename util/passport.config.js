const _ = require('lodash')
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {User} = require('../model/user.model');
const secret = 'Wheel$rid3';

const authConfig = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
    }))
}

module.exports = {
    authConfig
}
