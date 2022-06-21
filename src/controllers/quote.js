const Quote = require('../../src/models/quote');

exports.getAllQuotes = (req, res, next) => {

     const category = req.body.params.category;

     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;

     const querySearch = category !== "All" ? 
     {category: category, isConfirmed: true} : {isConfirmed: true};

     Quote.find(querySearch).countDocuments()
     .then(count => {
          totalData = count;
          return Quote.find(querySearch)
          .populate('user')
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "All Quote Fetched",
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

exports.getAllUserQuotes = (req, res, next) => {

     const userId = req.body.userId;
     const perPage = req.body.params.perPage || 10;
     const currentPage = req.body.params.currentPage || 1;
     const querySearch = {user: userId};

     Quote.find(querySearch).countDocuments()
     .then(count => {
          totalData = count;
          return Quote.find(querySearch)
          .populate('user')
          .skip((parseInt(currentPage)-1)*parseInt(perPage))
          .limit(parseInt(perPage));
     })
     .then(result => {
          res.status(200).json({
               message : "User Quotes Fetched",
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

exports.getQuoteById = (req, res, next) => {

     const quoteId = req.body.quoteId;

     Quote.findOne({isConfirmed: true, _id: quoteId})
     .populate('user')
     .then(quote => {
          if(!quote) res.status(400).json({message: "Quote not found"});
          else res.status(200).json({message: "Quote fetched", data: quote});
     })
     .catch(err => {
          next(err);
     })
}

exports.addQuote = (req, res, next) => {

     const createQuote = new Quote({
          category: req.body.category,
          text: req.body.text,
          user: req.body.userId,
          isConfirmed: false,
     });

     createQuote.save()
     .then(result => {
          res.status(200).json({
               message: "New Quote Created",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.confirmQuote = (req, res, next) => {

     const quoteId = req.body.quoteId;

     Quote.findById(quoteId)
     .then(quote => {
          if(!quote) res.status(400).json({message: "Quote not found"});

          quote.isConfirmed = true;
          return quote.save();
     })
     .then(result => {
          res.status(200).json({
               message: "Quote Confirmed",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}

exports.deleteQuote = (req, res, next) => {
     
     const quoteId = req.body.quoteId;

     Quote.findByIdAndRemove(quoteId)
     .then(result => {
          res.status(200).json({
               message: "Quote Deleted",
               data: result,
          });
     })
     .catch(err => {
          next(err);
     });
}
