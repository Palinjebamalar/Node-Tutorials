module.exports = (app) => {
    const Student = require('../controller/studentController');

    // Create a new Note
    app.get('/getAll', Student.getAll);
}