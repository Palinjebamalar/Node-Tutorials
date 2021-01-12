module.exports = (app) => {
    const passport = require('passport')
    const {adminAuth} = require('../middleware/passport')

    const User = require('../controller/userController');
    const AdminController = require('../controller/adminController');


    const needsAuth = passport.authenticate('jwt', { session: false })
    require('./../middleware/passport')(passport);
    const needsAdminAuth = adminAuth(passport).authenticate('admin_auth', {
        session: false,
        failWithError: true,
    });

    app.post('/admin', AdminController.CreateAdmin)
    app.post('/createStore/:id',needsAdminAuth, AdminController.createStore)

    app.post('/user/register',User.register)
    app.post('/user/login',User.login)
    app.get('/user/getUSer',needsAuth,User.getUser)
    app.put('/user/update',needsAuth,User.update)
    app.delete('/user/delete',needsAuth,User.Delete)

}