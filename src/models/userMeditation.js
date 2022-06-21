const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserMeditation = new Schema({
     user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
     meditation: {type: Schema.Types.ObjectId, required: true, ref: 'Meditation'},
     currentStep: {type: Number, required: true},
     totalStep: {type: Number, required:true},
},{
     timestamps: true,
});

module.exports = mongoose.model('UserMeditation', UserMeditation);