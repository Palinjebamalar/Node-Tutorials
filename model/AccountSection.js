const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSectionSchema = new mongoose.Schema({
    personID: {
        type: String, required: true,
        unique:false
    },
    feeType:{
        type: String,
    },
    totalFee: {
            type: Number,
    },
    paidFee: {
        type: Number
    },
        balance:{
            type:Number
        },
    student:{
        type: Schema.Types.ObjectId,
        ref: 'student',
    },
    
}, {timestamps: true})


module.exports = mongoose.model('accountSection', AccountSectionSchema)
