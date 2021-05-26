
const express = require('express'); 
const app = express(); 
const path = require('path'); 
const cors = require("cors");
const morgan = require('morgan');
var dotenv = require('dotenv');
dotenv.config();


//basic routing
const uploadRoute = require('./api/routes/upload');



/* MIDDLEWARES */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes Requests
app.use('/videos',uploadRoute);


//CORS Handling
app.use((req, res, next)=>
{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,  Content-Type, Accept, Authotization");
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status.json({})
    }
    next();
})

//Error Handling
app.use((req, res, next) =>
{
    const error = new Error('Not Found'); 
    console.status = 404;
    next(res.render('Error',{error:"This Page Is Does Not Exists",status:404}));
})

app.use((error,req, res, next) =>
{
    res.status(error.status || 500);
    next(res.render('Error',{error:error.message,status:error.status}));
});

module.exports = app;