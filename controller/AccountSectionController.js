const Account =require('../model/AccountSection')
const { isNull, isEmpty, to, ReE, ReS } = require('../services/util.services')
const validator = require('validator')
const { isEmail } = validator
const HttpStatus = require('http-status')

const createAccountDetails = async function (req, res) {

    const body = req.body
    let err, account

    if (isNull(body.personID))  {
        return ReE(res, 'please enter your personId', 400)
    }
    else if (isNull(body.feeType)) {
        return ReE(res, 'please enter your Fee Type', 400)
    }
     else if (isNull(body.totalFee)) {
        return ReE(res, 'please enter your Total Fee', 400)
    }
    else if (isNull(body.paidFee)) {
        return ReE(res, 'please enter your Paid Fee',
            400)
    }
    else if (isNull(body.balance)) {
        return ReE(res, 'please enter your balance',
            400)
    } else if (isNull(body.student)) {
        return ReE(res, 'please enter your Date of student Id',
            400)
    }

    [err, account] = await to(Account.findOne({ personID: body.personID }))
        if (err) return ReE(res, err, 422)
        
    if(account){
        return ReE(res, { message: "Person ID Alredy Exist" }, 422)
    }

    [err, account] = await to(Account.create(body))
    if (err) return ReE(res, err, 422)
    if (!account) {
        return ReE(res, { message: "you have no access" }, 422)
    }
if(account){
    return ReS(res, {
        message: 'Account Created',
        AccountDetails: account,

    }, 201)
}
   
}
module.exports.createAccountDetails = createAccountDetails


const findStudentAccountDetails = async(req, res) => {
    let body=req.params;
    let err, account;
    [err, account] = await to(Account.findOne({personID:body.personId}).populate({path:'student'}));
    if (err) return ReE(res, err, 422)
    console.log(account)
    if(account){
        return ReS(res, {
            message: 'Account Founded',
            AccountDetails: account,
    
        }, 201)
    }
}
module.exports.findStudentAccountDetails = findStudentAccountDetails

