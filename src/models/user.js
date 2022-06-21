const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
     name: {
          first: {type: String, required: true},
          last: {type: String, required:true},
     },
     gender: {type:String, enum: ['Male', 'Female'], required: true},
     dateOfBirth: {type: Date, required:true},
     address: {type: String, required:true},
     phoneNumber: {type: String, required: true},
     photo: {type: String},
     email: {type: String, required:true},
     password: {type: String, required: true},
});

module.exports = mongoose.model('User', User);