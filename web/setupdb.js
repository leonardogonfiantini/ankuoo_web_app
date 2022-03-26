var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

var url = process.env.MONGODB_URL;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  dbo.createCollection("timer", function(err, res) {
    if (err) throw err;
    console.log("Collection timer created!");
    db.close();
  }); 
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  dbo.createCollection("timetable", function(err, res) {
    if (err) throw err;
    console.log("Collection timetable created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  dbo.createCollection("onoff", function(err, res) {
    if (err) throw err;
    console.log("Collection onoff created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  console.log("Db connection succesfull");

  obj = {status: 0};

  dbo.collection("onoff").insertOne(obj, function(err, res) {
      if (err) throw err;
      console.log("OnOff initialized with value 0");
      db.close();
  });
});


