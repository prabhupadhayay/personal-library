const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var ObjectId=require('mongoose').Types.ObjectId;
const membershipschema = new Schema({
    membership_id: {
        type: String,
        
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
    membership: membershipschema
     
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema, 'users');

    

//    let userData = {
//     username: req.body.username,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     password: req.body.password,
//     created: today,
//     membership: {
//         membership_id: req.body.membership.membership_id,
//         btc: req.body.membership.btc,
//         xmr: req.body.membership.xmr,
//         trans_id: req.body.membership.trans_id
//     }
// }
