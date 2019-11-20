const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var ObjectId=require('mongoose').Types.ObjectId;
const contactSchema = new Schema({
    //     _id: {
    //     type: String
    // },
    name:{
        type:String
    },
    email:{
        type:String
    },
    // country:{
    //     type:String
    // },
    subject:{
        type:String
    }
})

module.exports = mongoose.model('contact',contactSchema, 'contacts');
