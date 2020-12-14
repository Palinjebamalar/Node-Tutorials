module.exports = (app) => {

    const Student = require('../controller/studentController');


    // Create a new Note
    app.delete('/delete', Student.delete);
}