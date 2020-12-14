module.exports = (app) => {

    const Student = require('../controller/studentController');


    // Create a new Note
    app.put('/update/:id', Student.update);
}