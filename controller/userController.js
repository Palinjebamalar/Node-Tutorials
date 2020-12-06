const User =require('../model/user')
const { isNull, isEmpty, to, ReE, ReS } = require('../services/util.services')
const validator = require('validator')
const { isEmail } = validator
const HttpStatus = require('http-status')

const register = async function (req, res) {

    const body = req.body
    let err, user

    if (isNull(body.name) || body.name.length < 3) {
        return ReE(res, 'please enter a username with minimum 3 characters', 400)
    } else if (isNull(body.email)) {
        return ReE(res, 'please enter your Email Id', 400)
    } else if (isNull(body.password) || body.password.length < 8) {
        return ReE(res, 'please enter a password with minimum 8 characters',
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
            name: user.name,
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