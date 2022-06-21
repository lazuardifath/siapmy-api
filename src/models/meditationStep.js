const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MeditationStep = new Schema({
     meditation: {type: Schema.Types.ObjectId, required: true, ref: 'Meditation'},
     step: {type: Number, required:true},
     name: {type: String, required: true },
     description: { type: String, required: true},
     resourceFile: { type: String, required: true},
     video: { type: String, required: true},
});

module.exports = mongoose.model('MeditationStep', MeditationStep);