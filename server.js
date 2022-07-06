const express=require('express')
const mongoose=require('mongoose')


const url='mongodb://localhost/jwt'

const app=express()
const User=require('./models/userModel')
const bodyParser=require('body-parser')
jsonwebtoken=require('jsonwebtoken')


mongoose.connect(url,{useNewUrlParser:true});

const con=mongoose.connection

con.on('open',()=>{
    console.log('Database Connected....');
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8000,()=>{
    console.log('Server Connected');
})


app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

var routes=require('./routes/userRoutes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });


  module.exports=app;
