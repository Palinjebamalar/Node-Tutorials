const Student =require('../model/student')
const { isNull, isEmpty, to, ReE, ReS } = require('../services/util.services')
const validator = require('validator')
const { isEmail } = validator
const HttpStatus = require('http-status')

const createStudent = async function (req, res) {

    const body = req.body
    let err, user

    if (isNull(body.name) || body.name.length < 3) {
        return ReE(res, 'please enter a name with minimum 3 characters', 400)
    }
    else if (isNull(body.Id)) {
        return ReE(res, 'please enter your class', 400)
    }
     else if (isNull(body.class)) {
        return ReE(res, 'please enter your class', 400)
    }
    else if (isNull(body.department)) {
        return ReE(res, 'please enter your department',
            400)
    }
    else if (isNull(body.age)) {
        return ReE(res, 'please enter your age',
            400)
    } else if (isNull(body.DOB)) {
        return ReE(res, 'please enter your Date of Birth',
            400)
    }

    [err, user] = await to(Student.findOne({ Id: body.Id }))
        if (err) return ReE(res, err, 422)
        
    if(user){
        return ReE(res, { message: "Alredy Exist" }, 422)
    }

    [err, user] = await to(Student.create(body))
    if (err) return ReE(res, err, 422)
    if (!user) {
        return ReE(res, { message: "you have no access" }, 422)
    }
if(user){
    return ReS(res, {
        message: 'Account Created',
        user: user,

    }, 201)
}
   
}
module.exports.createStudent = createStudent

