const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validate = require('mongoose-validator')
const CONFIG = require('../config/config')
const {TE, to} = require('../services/util.services')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    userName: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    userType:{
        type: String,
        required: true,
        enum:CONFIG.userType
    },
    firstName:{
        type: String,
    },
    lastName:{
        type: String,

    },
    phoneNumber:{
            type:String
        },
        gender:{
            type:String

        },
        active:{
            type:Boolean,
            default:true
        },
        admin:{
            type:Boolean,
            default:false
        }
    
}, {timestamps: true})

UserSchema.pre('save', async function (next) {
    
    if (this.isModified('password') || this.isNew) {
        
        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10))
        if (err) TE(err.message, true);
        
        [err, hash] = await to(bcrypt.hash(this.password, salt))
        if (err) TE(err.message, true)
        
        this.password = hash
        
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = async function (pw) {
    let err, pass
    if (!this.password) TE('password not set');
    [err, pass] = await to(bcrypt.compare(pw, this.password))
    if (err) TE(err)
    
    if (!pass) TE('Invalid username or password!')
    
    return this
}

UserSchema.methods.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration)
    return 'Bearer ' + jwt.sign({user_id: this._id}, CONFIG.jwt_encryption,
        {expiresIn: expiration_time})
}

UserSchema.methods.toWeb = function () {
    let json = this.toJSON()
    json.id = this._id//this is for the front end
    delete json.password
    
    return json
}

const User = module.exports = mongoose.model('User', UserSchema)
