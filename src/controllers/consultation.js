const Consultation = require('../models/consultation');

exports.getAllUserConsultation = (req, res, next) => {
     
     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;

     const querySearch = {user: req.body.userId};

     Consultation.find(querySearch).countDocuments()
     .then(count => {
          totalData = count;
          return Consultation.find(querySearch)
          .populate('consultant')
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "All User Consultation Fetched",
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

exports.getAllConsultantConsultation = (req, res, next) => {
     
     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;

     const querySearch = {consultant: req.body.consultantId};

     Consultation.find(querySearch).countDocuments()
     .then(count => {
          totalData = count;
          return Consultation.find(querySearch)
          .populate('user')
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "All Consultant Consultation Fetched",
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

exports.addConsultation = (req, res, next) => {

     const createConsultation = new Consultation ({
          user: req.body.userId,
          consultant: req.body.consultantId,
          date: req.body.date,
          shift: req.body.shift,
          status: 0,
     });

     createConsultation.save()
     .then((result) => {
          res.status(200).json({
               message: "New Consultation Created",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     })
}

exports.doneStatus = (req, res, next) => {
     Consultation.findById(req.body.consultationId)
     .then(consultation => {
          if(!consultation) res.status(200).json({message: "Consultation not found"});

          consultation.status = 1;
          return consultation.save();
     })
     .then((result) => {
          res.status(200).json({message: "Consultation done", data: result});
     })
     .catch(err =>{
          next(err);
     })
}

exports.deleteConsultation = (req, res, next) => {
     
     Consultation.findByIdAndRemove(req.body.consultationId)
     .then(result => {
          res.status(200).json({message: "Consultation deleted", data: result});
     })
     .catch(err =>{
          next(err);
     })
}

