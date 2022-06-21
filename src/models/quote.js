const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Quote = new Schema({
     category: {type: String, required: true },
     text: {type: String, required: true },
     user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
     isConfirmed: {type: Boolean, required: true},
},{
     timestamps: true,
});

module.exports = mongoose.model('Quote', Quote);