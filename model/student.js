const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: String,
    class: String,
    email:String,
    phone:Number,
    dateofBirth:Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('student', StudentSchema);