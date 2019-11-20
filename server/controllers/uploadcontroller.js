const express = require('express')
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');

const Upload = require('../models/upload')


const path   = require('path');
/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/files',
  filename: function(req, file, fn){
    fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
}); 
//init
const upload =  multer({
  storage: storageEngine,
  limits: { fileSize:200000 },
  fileFilter: function(req, file, callback){
    validateFile(file, callback);
  }
}).single('photo');
var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}


// upload(req, res,(error) => {
//     if(error){
//        res.redirect('/?msg=3');
//     }else{
//       if(req.file == undefined){
        
//         res.redirect('/?msg=2');
//       }else{
           
//           /**
 
//           var fullPath = "files/"+req.file.filename;
//           var document = {
//             path:     fullPath, 
//             caption:   req.body.caption
//           };

//         var upload = new Upload(document); 
//         photo.save(function(error){
//           if(error){ 
//             throw error;
//           } 
//           res.redirect('/?msg=1');
//        });
//     }
//   }
// });

module.exports = upload;