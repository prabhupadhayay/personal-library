const express = require("express");
const bodyparser = require("body-parser");
var urlencodedParser = bodyparser.urlencoded({
  extended: false
});
var cors = require("cors");
const path = require('path');
const port = process.env.PORT || 8080;

var app = express();
app.use(bodyparser.json()); 
app.use(cors())

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

const { mongoose } = require("./db.js");
let userController = require("./controllers/usercontroller");



//API Routes
app.use('/api/users', userController);
app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});