const UserMeditation = require('../models/userMeditation');
const Meditation = require('../models/Meditation');
const MeditationStep = require('../models/meditationStep');
const {cloudinary} = require('../../config/cloudinary');

exports.getAllMeditation = (req, res, next) => {
     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;

     Meditation.find().countDocuments()
     .then(count => {
          totalData = count;
          return Meditation.find()
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "All Meditation Fetched",
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

exports.getAllUserMeditation = (req, res, next) => {
     
     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;

     UserMeditation.find({user: req.body.userId}).countDocuments()
     .then(count => {
          totalData = count;
          return UserMeditation.find({userId: req.body.userId})
          .populate('meditation')
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "All User Meditation Fetched",
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

exports.getUserMeditationById = (req, res, next) => {

     UserMeditation.findById(req.body.userMeditationId)
     .populate('meditation')
     .then(userMeditation => {
          if(!userMeditation) res.status(400).json({message: "User Meditation not found"});
          else res.status(200).json({message: "User Meditation fetched", data: userMeditation});
     })
     .catch(err => {
          next(err);
     })
}

exports.getAllMeditationStep = (req, res, next) => {
     MeditationStep.find({meditation: req.body.meditationId})
     .then(result => {
          res.status(200).json({
               message : "All Meditation Step Fetched",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.addMeditation = (req, res, next) => {
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
          const createMeditation = new Meditation({
               name: req.body.name,
               image: urlResult === 500 ? null : urlResult,
               description: req.body.description,
               withVideo: req.body.withVideo,
               duration: req.body.duration,
               durationType: req.body.durationType,
          });
          
          createMeditation.save()
          .then(result => {
               res.status(200).json({
                    message: "New Meditation Created",
                    data: result,
               });
          })
          .catch(err => {
               next(err);
          });
     });
}

exports.addMeditationStep = (req, res, next) => {
     const createMeditationStep = new MeditationStep({
          meditation: req.body.meditationId,
          step: req.body.step,
          name: req.body.name,
          description: req.body.description,
          resourceFile: req.body.resourceFile,
          video: req.body.video,
     });
     
     createMeditationStep.save()
     .then(result => {
          res.status(200).json({
               message: "New Meditation Step Created",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.addUserMeditation = (req, res, next) => {

     MeditationStep.find({meditation: req.body.meditationId}).countDocuments()
     .then(count => {
          if(count <= 0) res.status(400).json({message: "Meditation Step not found"})
          
          const createUserMeditation = new UserMeditation({
               user: req.body.userId,
               meditation: req.body.meditationId,
               currentStep: 1,
               totalStep: count,
          });

          return createUserMeditation.save();
     })
     .then(result => {
          res.status(200).json({
               message: "New User Meditation Created",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.changeMeditationStep = (req,res, next) => {
     UserMeditation.findById(req.body.userMeditationId)
     .populate('meditation')
     .then(userMeditation => {
          if(!userMeditation) res.status(200).json({message: "User Meditation not found"});

          userMeditation.currentStep = req.body.step;
          return userMeditation.save();
     })
     .then((result) => {
          res.status(200).json({message: "Step updated", data: result});
     })
     .catch(err =>{
          next(err);
     })
}

exports.deleteMeditation = (req, res, next) => {
     Meditation.findByIdAndRemove(req.body.meditationId)
     .then(result => {
          res.status(200).json({message: "Meditation deleted", data: result});
     })
     .catch(err =>{
          next(err);
     })
}

exports.deleteUserMeditation = (req, res, next) => {
     UserMeditation.findByIdAndRemove(req.body.userMeditationId)
     .then(result => {
          res.status(200).json({message: "User Meditation deleted", data: result});
     })
     .catch(err =>{
          next(err);
     })
}