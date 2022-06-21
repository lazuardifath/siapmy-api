const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Consultation = new Schema({
     user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
     consultant: {type: Schema.Types.ObjectId, required: true, ref: 'Consultant'},
     date: {type: Date, required: true },
     shift: { type: String, required: true},
     status: {type: Number, required: true},
},{
     timestamps: true,
});

module.exports = mongoose.model('Consultation', Consultation);