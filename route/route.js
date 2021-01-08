module.exports = (app) => {

    const Student = require('../controller/studentController');
    const AccountSection = require('../controller/AccountSectionController');


    app.post('/createStudent', Student.createStudent);
    app.post('/createAccountDetails',AccountSection.createAccountDetails)
    app.get('/getStudentAccoutDetails/:personId',AccountSection.findStudentAccountDetails)

  
}