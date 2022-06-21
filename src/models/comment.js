const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
     type: {type: String, required:true},
     contentId: {type: Schema.Types.ObjectId, required: true},
     text: {type: String, required: true },
     user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
     isEdited : {type: Boolean, required:true},
},{
     timestamps: true,
});

module.exports = mongoose.model('Comment', Comment);