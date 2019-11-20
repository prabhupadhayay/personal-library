const express = require('express')
const router = express.Router()
const cors = require('cors')

const app = express()

const Contact = require('../models/contact')
router.use(cors())

router.post('/contact', (req, res) => {
    const today = new Date()
    let contactData = {

       // _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        created: today
    }
    let user = new Contact(contactData)

    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("error while doing post " + JSON.stringify(err, undefined, 2));
        }
    });

});


module.exports = router