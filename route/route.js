module.exports = (app) => {

    const Student = require('../controller/studentController');


    // Create a new Note
    app.put('/updateMany', Student.updateMany);
}