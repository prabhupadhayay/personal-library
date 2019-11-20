var express = require('express');
var router    = express.Router();
var upload    = require('./uploadcontroller');
const Upload = require('../models/upload')

/* GET home page. */
router.get('/photos', function(req, res, next) {

  Photo.find({}, ['path','caption'], {sort:{ _id: -1} }, function(err, uploads) {
    res.render('index', { title: 'occult-archive', msg:req.query.msg, photolist : uploads });
    
  });

});

/** Upload file to path and add record to database */

router.post('/upload', function(req, res) {

  upload(req, res,(error) => {
      if(error){
         res.send(error);
      }else{
        if(req.file == undefined){
          
          res.send(error);

        }else{
             
            /**
             * Create new record in mongoDB
             *var filename=id+.png;
             */
            var fullPath = "files/"+req.file.filename;

            var document = {
              path:     fullPath, 
              caption:   req.body.caption
            };
  
          var upload = new Upload(document); 
          upload.save(function(error,doc){
            if(error){ 
              throw error;
            } 
            res.send(doc)
            res.send(error)
         });
      }
    }
  });    
});

module.exports = router;