const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
//var ObjectId=require('mongoose').Types.ObjectId;
const uploadschema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
      },
      avatar: {
        type: String
      }
})
module.exports = mongoose.model('upload', uploadschema, 'uploads');