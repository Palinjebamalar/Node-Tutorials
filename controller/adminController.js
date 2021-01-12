const User =require('../model/user')
const { isNull, isEmpty, to, ReE, ReS } = require('../services/util.services')
const validator = require('validator')
const { isEmail ,isMobilePhone} = validator
const HttpStatus = require('http-status')
const CONFIG =require('../config/config')


module.exports.CreateAdmin = async (req, res) =>{
    let body= req.body;
    let err,admin
    body.admin=true;
    body.userType='admin';
    if(isNull(body.email)) return ReE(res, {message:'Email is required!'}, HttpStatus.BAD_REQUEST);
    if(!isEmail(body.email)) {return await  ReE(res, 'Valid Email Id required!', HttpStatus.BAD_REQUEST)}
    if(isNull(body.password)) return ReE(res, {message:'Password is required!'}, HttpStatus.BAD_REQUEST);
    if(body.password.length<8) return ReE(res, {message:'Password Should be 8 charactes'}, HttpStatus.BAD_REQUEST);
    if(isNull(body.adminCode)) return ReE(res, {message:'Admin Code is required!'}, HttpStatus.BAD_REQUEST);
    if(CONFIG.adminCode!=body.adminCode)return ReE(res, {message:'Valid Admin code is required!'}, HttpStatus.BAD_REQUEST);
    [err,admin] = await to(User.create(body));
    if(err)return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    return ReS(res, {
        message: 'Admin Created',
        admin:admin,
    }, 201)

}


const createStore = async function (req, res) {
    let err, user
    let body=req.params;
    [err, user] = await to(User.findOne({ _id: body.id }))
    if (err) {
        return ReE(res, err, 400)
    }
    user.userType='store';
    [err, user] = await to(user.save())
    if (err) {
        return ReE(res, err, 400)
    }
    return ReS(res,
        {
            message: 'Store Created',
            store:user

        }, HttpStatus.OK,
    )
}
module.exports.createStore = createStore
