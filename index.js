const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useUnifiedTopology: true ,
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected",dbConfig.url);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
require('./route/route')(app);
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome To Tech MCA"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});