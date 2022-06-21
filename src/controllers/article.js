const Article = require('../models/article');
const {cloudinary} = require('../../config/cloudinary');

exports.getAllArticles = (req, res, next) => {

     const category = req.body.params.category;

     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;

     const querySearch = category !== "All" ? 
     {category: category, isConfirmed: true} : {isConfirmed: true};

     Article.find(querySearch).countDocuments()
     .then(count => {
          totalData = count;
          return Article.find(querySearch)
          .populate('user')
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "All Article Fetched",
               data: result,
               total_data: totalData,
               per_page: perPage,
               current_page: currentPage,
               total_page: Math.ceil(totalData/ perPage),
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.getAllUserArticles = (req, res, next) => {

     const userId = req.body.userId;
     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;
     const querySearch = {user: userId};

     Article.find(querySearch).countDocuments()
     .then(count => {
          totalData = count;
          return Article.find(querySearch)
          .populate('user')
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "User Article Fetched",
               data: result,
               total_data: totalData,
               per_page: perPage,
               current_page: currentPage,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.addArticle = (req, res, next) => {
     
     const uploadImagePromise = new Promise (async(resolve, reject) => {
          try{
               const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
                    upload_preset: 'bilikmental',
               });
               resolve(uploadedResponse.secure_url);
          }catch(err){
               resolve(500);
          }
     });

     uploadImagePromise
     .then(async (urlResult) => {
          const createArticle = new Article({
               category: req.body.category,
               title: req.body.title,
               content: req.body.content,
               image: urlResult === 500 ? null : urlResult,
               user: req.body.userId,
               isConfirmed: false,
          });

          return createArticle.save();
     })
     .then(result => {
          res.status(200).json({
               message: "New Article Submitted",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.getArticleById = (req, res, next) => {

     Article.findOne({isConfirmed: true, _id: req.body.articleId})
     .populate('user')
     .then(article => {
          if(!article) res.status(400).json({message: "Article not found"});
          else res.status(200).json({message: "Article fetched", data: article});
     })
     .catch(err => {
          next(err);
     })
}

exports.confirmArticle = (req, res, next) => {

     Article.findById(req.body.articleId)
     .then(article => {
          if(!article) res.status(400).json({message: "Article not found"});

          article.isConfirmed = true;
          return article.save();
     })
     .then(result => {
          res.status(200).json({
               message: "Article Confirmed",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.deleteArticle = (req, res, next) => {

     Article.findByIdAndRemove(req.body.articleId)
     .then(result => {
          res.status(200).json({message: "Article deleted", data: result});
     })
     .catch(err =>{
          next(err);
     })
}