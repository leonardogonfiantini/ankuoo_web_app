const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL;

app.set("view engine", "ejs")
app.use(express.static('public')); // per renderizzare i css insieme agli ejs

app.use(function timelog(res, res, next) {
  console.log('Time: ', Date.now());
  next();
});

app.get('/', (req, res) => {
    res.render("homepage/home") //si renderizza i .ejs 
});

app.get('/login', (req, res) => {
    res.render("login/login")
});

app.listen(port)