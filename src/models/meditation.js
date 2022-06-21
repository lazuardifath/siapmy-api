const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Meditation = new Schema({
     name: {type: String, required: true },
     image: { type: String },
     description: {type: String, required: true},
     withVideo: {type: Boolean, required: true},
     duration: {type: Number, required:true},
     durationType: {type: String, enum:["mins","hrs","days"]},

});

module.exports = mongoose.model('Meditation', Meditation);