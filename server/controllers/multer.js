const express = require('express')
let multer = require('multer');
//var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
var assert = require('assert');
var url = 'mongodb+srv://prabh:prabh@node-api-ilqns.mongodb.net/test?retryWrites=true&w=majority';
var router    = express.Router();



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});


router.post('/fileUpload', upload.single('image'), (req, res, next) => {
    mongoose.connect(url,{ useUnifiedTopology: true }, (err, db) => {
        assert.equal(null, err);
        insertDocuments(db, 'public/files' + req.file.filename, () => {
            db.close();
            res.json({'message': 'File uploaded successfully'});
        });
     });
});
module.exports = router;


var insertDocuments = function(db, filePath, callback) {
    var collection = db.collection('upload');
    collection.insertOne({'imagePath' : filePath }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}