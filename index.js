const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended:true, limit: "50mb"}));

// const meditationRoutes = require('./src/routes/meditation');
const authRoutes = require('./src/routes/auth');
const quoteRoutes = require('./src/routes/quote');
const commentRoutes = require('./src/routes/comment');
const articleRoutes = require('./src/routes/article');
const consultantRoutes = require('./src/routes/consultant');
const consultationRoutes = require('./src/routes/consultation');
// app.use('/v1/meditations', meditationRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/quotes', quoteRoutes);
app.use('/v1/comments', commentRoutes);
app.use('/v1/articles', articleRoutes);
app.use('/v1/consultants', consultantRoutes);
app.use('/v1/consultations', consultationRoutes);

app.use((error, req, res, next) => {

     console.log(error);
     const status = error.errorStatus || 500;
     const message = error.errorMessage;
     const data = error.data;

     res.status(status).json({message: message, data: data});
});

mongoose.connect("mongodb+srv://siapmy1:Siapmy12!@siapmy1.wjizrn5.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
     app.listen(process.env.PORT || 4000, () => console.log("Connection success"));
})
.catch( err => console.log(err));