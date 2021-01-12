const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
const CONFIG = require('../config/config');
const {to, ReE, ReS} = require('../services/util.services')


module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
        let err, user;
        [err, user] = await to(User.findById(jwt_payload.user_id));
        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
};

module.exports.adminAuth = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;
    
    
    passport.use("admin_auth",
        new JwtStrategy(opts, async function(jwt_payload, done){
        let err, user;
        [err, user] = await to(User.findById(jwt_payload.user_id));
        if(err) return done(err, false);
    
        console.log('Admin auth')
    
        if(user && user.admin === true ||user && user.role ) {
            return done(null, user);
        }else{
            return done(null, false, {message: "User must be admin"});
        }
    }));
    
    return passport
}