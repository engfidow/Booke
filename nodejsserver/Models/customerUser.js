const mongoose = require('mongoose');
const CustomerSchema = mongoose.Schema({
    name :{type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    imageurl: {type: String, required: true}

})

module.exports = mongoose.model("CustomerUser", CustomerSchema);