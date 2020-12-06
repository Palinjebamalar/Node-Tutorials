module.exports = (app) => {
    const Student = require('../controller/studentController');

    // Create a new Note
    app.post('/create', Student.create);
    app.get('/get', Student.findAll);
    app.get('/getById/:id', Student.findOne);
    app.put('/update/:id', Student.update);
    app.delete('/delete/:id', Student.delete);
}