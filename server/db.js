const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prabh:prabh@node-api-ilqns.mongodb.net/test?retryWrites=true&w=majority', {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (!err)
        console.log("MongoDb Connected Successfully");
    else
        console.log('error in db:' + JSON.stringify(err, undefined, 2));
});
module.exports = mongoose;