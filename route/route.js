module.exports = (app) => {
    const passport = require('passport')

    const Student = require('../controller/studentController');
    const User = require('../controller/userController');


    const needsAuth = passport.authenticate('jwt', { session: false })
    require('./../middleware/passport')(passport)

    // Create a new Note
    app.post('/create', Student.create);
    app.get('/get', Student.findAll);
    app.get('/getById/:id', Student.findOne);
    app.put('/update/:id', Student.update);
    app.delete('/delete/:id', Student.delete);

    app.post('/register',User.register)
    app.post('/login',User.login)
    app.get('/getUSer',needsAuth,User.getUser)
}