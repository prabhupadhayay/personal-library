const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const userSchema2 = new Schema({
    username: {
        type: String,
        index: true,
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
    membership: {
        type: {

            BTC: {
                type: String
            },
            XMR: {
                type: String
            },

            transaction_id: {
                type: String,
                required: true
            },

        },
        required: false
    }


});
userSchema2.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema2, 'users');