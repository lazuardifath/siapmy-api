const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Article = new Schema({
     category: {type: String, required:true},
     title: {type: String, required: true },
     content: { type: String, required: true},
     image: {type: String},
     user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
     isConfirmed: {type: Boolean, required: true},
},{
     timestamps: true,
});

module.exports = mongoose.model('Article', Article);