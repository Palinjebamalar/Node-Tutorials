module.exports = (app) => {
    const passport = require('passport')

    const User = require('../controller/userController');


    const needsAuth = passport.authenticate('jwt', { session: false })
    require('./../middleware/passport')(passport)

    app.post('/register',User.register)
    app.post('/login',User.login)
    app.get('/getUSer',needsAuth,User.getUser)
    app.get('/update',needsAuth,User.update)

}