module.exports = (app) => {
    const Student = require('../controller/studentController');

    // Create a new Note
    app.get('/getByName/:name', Student.getByName);
}