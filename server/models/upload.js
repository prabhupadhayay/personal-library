const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
//var ObjectId=require('mongoose').Types.ObjectId;
const uploadschema = new Schema({
    user_id: {
        type: String
    },
    path: {
        type: String
    },
    caption: {
        type: String
    }
})
module.exports = mongoose.model('upload', uploadschema, 'uploads');