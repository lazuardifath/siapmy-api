const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Consultant = new Schema({
     name: {type: String, required: true },
     description: {type: String},
     email: { type: String, required: true},
     password: {type: String, required: true},
     photo: {type: String},
     isConfirmed: {type: Boolean, required: true},
});

module.exports = mongoose.model('Consultant', Consultant);