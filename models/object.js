const mongoose = require('mongoose'); // DataBase

const objectSchema = mongoose.Schema({
    name: {type: String, required: true},
    weight: {type: Number, required: true},
    url: {type: String, required: false},
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
})

module.exports = mongoose.model('Object', objectSchema);