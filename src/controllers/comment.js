const Comment = require('../models/comment');

exports.getAllComments = (req, res, next) => {

     Comment.find({type: req.body.type, contentId: req.body.contentId})
     .populate('user')
     .then(comments => {
          res.status(200).json({message: "Comments Fetched", data: comments});
     })
     .catch(err => {
          next(err);
     })
}

exports.addComment = (req, res, next) => {

     const createComment = new Comment ({
          type : req.body.type,
          contentId: req.body.contentId,
          text: req.body.text,
          user: req.body.userId,
          isEdited: false,
     });

     createComment.save()
     .then((result) => {
          res.status(200).json({
               message: "New Comment Created",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     })
}

exports.updateComment = (req, res, next) => {

     Comment.findById(req.body.commentId)
     .then(comment => {
          if(!comment) res.status(400).json({message: "Comment not found"});

          comment.text = req.body.text;
          comment.isEdited = true;

          return comment.save();
     })
     .then(result => {
          res.status(200).json({message: "Comment updated", data: result});
     })
     .catch(err => {
          next(err);
     })
}

exports.deleteComment = (req, res, next) => {

     Comment.findByIdAndRemove(req.body.commentId)
     .then(result => {
          res.status(200).json({message: "Comment deleted", data: result});
     })
     .catch(err => {
          next(err);
     })
}