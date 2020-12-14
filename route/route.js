module.exports = (app) => {

    const Student = require('../controller/studentController');


    // Create a new Note
    app.post('/create', Student.create);

}