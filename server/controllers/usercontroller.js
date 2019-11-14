const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
var ObjectId=require('mongoose');
var ObjectId=require('mongoose').Types.ObjectId;
const expressValidator = require('express-validator')
const {
    check,
    validationResult
} = require('express-validator');
const app = express()
//app.use(expressValidator())

const User = require('../models/user')
router.use(cors())

process.env.SECRET_KEY = 'secret'

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.post('/register', (req, res) => {
    //let userData = req.body
    const today = new Date()


    let userData = {

        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        //created: today,
        membership: {
            membership_id: req.body.membership.membership_id,
            btc: req.body.membership.btc,
            xmr: req.body.membership.xmr,
            trans_id: req.body.membership.trans_id
        },

    }
    // if(userData.membership.membership_id == 2){


    // }else{

    // }

    // form validation
    // if (req.body.membership[0] == 2) {
    //     //validation
    //     let userData1 = {
    //         BTC: req.body.BTC,
    //         XMR: req.body.XMR,
    //         trans_id: req.body.trans_id
    //     }
    //     // userData->key = val;
    // } else {
    //     userData1 = {
    //         tok: req.body.tok
    //     }
    // }
    // let userData = userData1 + userData2;


    let user = new User(userData)

    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = {
                _id: registeredUser._id

            }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({
                token: token,
                _id: registeredUser._id,
                first_name: registeredUser.first_name,
                last_name: registeredUser.last_name,
                email: registeredUser.email
            })
        }
    })
})




router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({
        email: userData.email
    }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid Password')
            } else {
                let payload = {
                    _id: user._id

                }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({
                    token: token,
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                })
            }
        }
    })
})




router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.send(docs);

        } else console.log('Error is:' + JSON.stringify(err, undefined, 2));
    });
});



router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Records with given id  ${ req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err)
            res.send(doc);
        else
            console.log("error there :" + JSON.stringify(err, undefined, 2));
    })
})



router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Records with given id  ${ req.params.id}`);
    // let now = new Date();
    // now.toUTCString();
    // new Date(now.toUTCString());
    let userData = {

        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
       // created: today,
        membership: {
            membership_id: req.body.membership.membership_id,
            btc: req.body.membership.btc,
            xmr: req.body.membership.xmr,
            trans_id: req.body.membership.trans_id
        },

    }
    User.findByIdAndUpdate(req.params.id, {
        $set: userData
    }, {
        new: true
    }, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('error :' + JSON.stringify(err, undefined, 2));
    })
});



router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Records with given id  ${ req.params.id}`);
    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('error :' + JSON.stringify(err, undefined, 2));
    })
});

router.post('/add', (req, res) => {

    let userData = {

        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      //  created: today,
        membership: {
            membership_id: req.body.membership.membership_id,
            btc: req.body.membership.btc,
            xmr: req.body.membership.xmr,
            trans_id: req.body.membership.trans_id
        },

    }


    userData.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("error while doing post " + JSON.stringify(err, undefined, 2));
        }
    });

});





module.exports = router