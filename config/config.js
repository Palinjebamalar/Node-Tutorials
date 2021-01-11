let CONFIG = {} //Make this global to use all over the application

CONFIG.url          = 'mongodb://localhost:27017/nodeNotes';
CONFIG.jwt_expiration  =  '28800';
CONFIG.jwt_encryption  = 'jwt_please_change';
CONFIG.userType = ['user','store','admin'];
CONFIG.editableUserFields = ['password','userType','firstName','lastName','phoneNumber','gender','active']
module.exports = CONFIG;
