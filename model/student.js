const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: String,
    class: String
}, {
    timestamps: true
});

module.exports = mongoose.model('student', NoteSchema);