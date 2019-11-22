const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const Role = require('../_helpers/role');
var ObjectId=require('mongoose').Types.ObjectId;
const membershipschema = new Schema({
    membership_id: {
        type: String
        
    },
    btc: {
        type: String
    },
    xmr: {
        type: String
    },
    trans_id: {
        type: String
    }
})

const userSchema = new Schema({
    username: {
        type: String,
       
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    created: {
        type: String
    },
    role:{
        type:String,
      //default:Role.User
    },
    membership: membershipschema
     
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema, 'users');

    


