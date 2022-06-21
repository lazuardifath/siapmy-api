const Consultant = require('../models/consultant');
const bcrypt = require('bcrypt');
const {cloudinary} = require('../../config/cloudinary');

exports.addConsultant = async (req, res, next) => {
     const uploadImagePromise = new Promise (async(resolve, reject) => {
          try{
               const uploadedResponse = await cloudinary.uploader.upload(req.body.photo, {
                    upload_preset: 'bilikmental',
               });
               resolve(uploadedResponse.secure_url);
          }catch(err){
               resolve(500);
          }
     });

     uploadImagePromise
     .then(async (urlResult) => {
          const createConsultant = new Consultant({
               name: req.body.name,
               description: req.body.description,
               photo: urlResult === 500 ? null : urlResult,
               email: req.body.email,
               password: null,
               isConfirmed: false,
          });

          const salt = await bcrypt.genSalt(10);
          createConsultant.password = await bcrypt.hash(req.body.password, salt);
          
          createConsultant.save()
          .then(result => {
               res.status(200).json({
                    message: "New Consultant Registered",
                    data: result,
               });
          })
          .catch(err => {
               next(err);
          });
     });
}

exports.getAllConsultant = (req, res, next) => {

     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;

     const querySearch = {isConfirmed: true};

     Consultant.find(querySearch).countDocuments()
     .then(count => {
          totalData = count;
          return Consultant.find(querySearch)
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "All Consultant Fetched",
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

exports.getConsultantById = (req, res, next) => {
     
     Consultant.findOne({isConfirmed: true, _id: req.body.consultantId})
     .then(consultant => {
          if(!consultant) res.status(400).json({message: "Consultant not found"});
          else res.status(200).json({message: "Consultant fetched", data: consultant});
     })
     .catch(err => {
          next(err);
     })
}

exports.confirmConsultant = (req, res, next) => {

     Consultant.findById(req.body.consultantId)
     .then(consultant => {
          if(!consultant) res.status(400).json({message: "Consultant not found"});

          consultant.isConfirmed = true;
          return consultant.save();
     })
     .then(result => {
          res.status(200).json({
               message: "Consultant Confirmed",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.deleteConsultant = (req, res, next) => {
     
     Consultant.findByIdAndRemove(req.body.consultantId)
     .then(result => {
          res.status(200).json({message: "Consultant deleted", data: result});
     })
     .catch(err =>{
          next(err);
     })
}