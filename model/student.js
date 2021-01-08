const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NoteSchema = mongoose.Schema({
    name: {
        type: String, required: true,
        unique:true
    },
    class: String,
    department:String,
    Id:{
        type: String, required: true,
        unique:true
    },
    age:Number,
    DOB:Date,

}, {
    timestamps: true
});

module.exports = mongoose.model('student', NoteSchema);