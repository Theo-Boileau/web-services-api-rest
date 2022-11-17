const mongoose = require('mongoose'); // DataBase

const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
})

module.exports = mongoose.model('User', userSchema);