let CONFIG = {} //Make this global to use all over the application

// CONFIG.url          = 'mongodb://localhost:27017/nodeNotes';
CONFIG.url          = 'mongodb+srv://Palin:palin@123@nodematerials.uqz0z.mongodb.net/test';
CONFIG.jwt_expiration  =  '28800';
CONFIG.jwt_encryption  = 'jwt_please_change';

module.exports = CONFIG;
