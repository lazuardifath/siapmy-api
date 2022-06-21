const User = require('../models/user');
const Admin = require('../models/admin');
const Consultant = require('../models/consultant');
const bcrypt = require('bcrypt');
const {cloudinary} = require('../../config/cloudinary');

exports.addUser = async (req, res, next) => {
     
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
          const createUser = new User({
               name: {
                    first: req.body.name.first,
                    last: req.body.name.last,
               },
               gender: req.body.gender,
               dateOfBirth: req.body.dateOfBirth,
               address: req.body.address,
               phoneNumber: req.body.phoneNumber,
               photo: urlResult === 500 ? null : urlResult,
               email: req.body.email,
               password: null,
          });

          const salt = await bcrypt.genSalt(10);
          createUser.password = await bcrypt.hash(req.body.password, salt);
          
          createUser.save()
          .then(result => {
               res.status(200).json({
                    message: "New User Registered",
                    data: result,
               });
          })
          .catch(err => {
               next(err);
          });
     });
}

exports.addAdmin = async (req, res, next) => {
     const createAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: null,
     });

     const salt = await bcrypt.genSalt(10);
     createAdmin.password = await bcrypt.hash(req.body.password, salt);
     
     createAdmin.save()
     .then(result => {
          res.status(200).json({
               message: "New Admin Registered",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.checkEmail = (req, res, next) => {

     User.findOne({email: req.body.email})
     .then(result => {
          if(result){
               res.status(200).json({emailExist: true});
          }else{
               res.status(200).json({emailExist: false});
          }
     })
     .catch(err => {
          next(err);
     });
}

exports.login = async (req, res, next) => {

     const admin = await Admin.findOne({email: req.body.email});
     const consultant = await Consultant.findOne({email:req.body.email});
     const user = await User.findOne({email: req.body.email});
     
     const data = admin ? admin : consultant ? consultant : user ? user : null;
     
     if(data){
          const isMatch = await bcrypt.compare(req.body.password, data.password);
     
          if(isMatch) {
               res.status(200).json({message: "Login success", data: data , role: 
          admin ? 1 : consultant ? 2 : user ? 3 : ''});
          }else{
               res.status(400).json({message: "Invalid email or password"});
          }
     }else {
          res.status(400).json({message: "Invalid email or password"});
     }
}

exports.getUserData = async (req, res, next) => {

     const userId = req.body.userId;
     const userData = await User.findById(userId);

     if(userData){
          res.status(200).json({message: "Fetch user data success", data: userData});
     }else{
          res.status(400).json({message: "Failed to fetch data"});
     }
}