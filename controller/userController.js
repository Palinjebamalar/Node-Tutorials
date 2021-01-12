const User =require('../model/user')
const { isNull, isEmpty, to, ReE, ReS } = require('../services/util.services')
const validator = require('validator')
const { isEmail ,isMobilePhone} = validator
const HttpStatus = require('http-status')
const CONFIG =require('../config/config')


const register = async function (req, res) {

    const body = req.body
    let err, user
    body.userType="user";
    if (isNull(body.userName) || body.userName.length < 3) {
        return ReE(res, 'please enter a username with minimum 3 characters', 400)
    } else if (isNull(body.email)) {
        return ReE(res, 'please enter your Email Id', 400)
      } else if (!isEmail(body.email)) {
            return ReE(res, 'please enter valid Email Id', 400)
    } else if (isNull(body.password) || body.password.length < 8) {
        return ReE(res, 'please enter a password with minimum 8 characters',
            400)
    }
    else if (isNull(body.phoneNumber)) {
        return ReE(res, 'please enter your phone number', 400)
      }
      else if (!(isMobilePhone(body.phoneNumber))) {
        return ReE(res, 'please enter valid phone Number',
            400)
    }

    [err, user] = await to(User.findOne({ email: body.email }))
        if (err) return ReE(res, err, 422)
        
    if(user){
        return ReE(res, { message: "Alredy Register this Account Please Login" }, 422)
    }

    [err, user] = await to(User.create(body))
    if (err) return ReE(res, err, 422)
    if (!user) {
        return ReE(res, { message: "you have no access to register in this app" }, 422)
    }
if(user){
    return ReS(res, {
        message: 'Account Created',
        user: {
            userName: user.userName,
            email: user.email
        },

    }, 201)
}
   
}
module.exports.register = register


const login = async function (req, res) {
    let err, user
    const email = req.body.email
    const password = req.body.password

    if (isNull(email)) {
        return ReE(res, { message: 'Email id is required' }, 400)
    }

    if (isNull(password)) {
        return ReE(res, { message: 'Please enter your password to login' }, 400)
    }

    [err, user] = await to(User.findOne({ email: { '$regex': email, '$options': 'i'} }))
    if (err) return ReE(res, err, 400)
    if (!user) return ReE(res,
        { message: 'Email Id is not registered. Please register and try again' },
        400)


    [err, user] = await to(user.comparePassword(password))

    if (err) return ReE(res, err, 422)

    if (!user) {
        return ReE(res,
            { message: 'Invalid Username or password. please try again.' }, 400)
    }

    ReS(res, {
        message: 'User logged in ',
        user: {
            email: user.email,
            name: user.name,
        },
        token: user.getJWT(),
    }, 200)

}
module.exports.login = login

const getUser = async function (req, res) {
    let user = req.user
    return ReS(res, { user: user.toWeb() })
}
module.exports.getUser = getUser

const update = async function (req, res) {
    let err, user, data
    user = req.user
    data = req.body

    CONFIG.editableUserFields.forEach(function (field) {
        if (typeof field === 'string' && data[field] !== undefined) {
            user[field] = data[field]
        }
    });


    [err, user] = await to(user.save())
    if (err) {
        return ReE(res, err, 400)
    }
    return ReS(res,
        {
            message: 'Updated User.',
            user: user,
        }, HttpStatus.OK,
    )
}
module.exports.update = update


const Delete = async function (req, res) {
    let err, user
    user = req.user
    user.active=false;
    [err, user] = await to(user.save())
    if (err) {
        return ReE(res, err, 400)
    }
    return ReS(res,
        {
            message: 'User Deleted',
        }, HttpStatus.OK,
    )
}
module.exports.Delete = Delete
