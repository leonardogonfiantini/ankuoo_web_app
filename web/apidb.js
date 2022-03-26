require('dotenv').config();

const express = require('express');

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL;

const api = express.Router();

api.use('/timer/insert', function insertTimer(req, res) {

    var timer = req.query.timer;
    var status = req.query.status;
    console.log("New timer insert request: "+timer+" with status: "+status)

    try {
        var check = timer.split(':');

        if (check.length > 2 || check.length < 1) throw new Error("Timer format not valid");

        if (check[1] > 59) throw new Error("Timer seconds not valid");

        if (timer == null) throw new Error('Timer is null');

    } catch(err) {
        res.send("ERROR Timer format not correct");
        throw new Error("Timer format not valid");
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull");

        obj = {timer: timer, status: 0};

        dbo.collection("timer").insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("Timer inserted with value: "+timer);
            db.close();
        });
    });

    res.send("OK");

});

api.use('/timer/find_all', function findallTimer(req, res) {

    console.log("New timer find all request")

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull")

        dbo.collection("timer").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log("Timer find_all succesfull")
            res.send(result)
            db.close();
        });
    });

});

api.use('/timer/delete', function deleteTimer(req, res) {
    
    console.log("New timer delete request")

    var timer = req.query.timer;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull")

        dbo.collection("timer").deleteOne({timer: timer}, function(err, result) {
            if (err) throw err;
            console.log("Timer delete succesfull")
            res.send("Timer eliminato")
            db.close();
        });
    });
});

api.use('/timer/update', function updateTimer(req, res) {
    
    console.log("New timer update request")

    var timer = req.query.timer;
    var status = req.query.status;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull")

        var newvalue = { $set: { timer: timer, status: status} };

        dbo.collection("timer").updateOne({timer: timer}, newvalue, function(err, result) {
            if (err) throw err;
            console.log("Timer update succesfull")
            res.send("Timer update")
            db.close();
        });
    });
});



api.use('/time_schedule/insert', function insertTimeSchedule(req, res) {
    res.send("time_schedule/insert");


});

api.use('/time_schedule/find_all', function findallTimeSchedule(req, res) {
    res.send("time_schedule/find_all");

}); 

api.use('/time_schedule/delete', function deleteTimeSchedule(req, res) {
    res.send("time_schedule/delete");


});

api.use('/onoff/update', function updateOnOff(req, res) {
    var status = req.query.status;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull")

        var newvalue = { $set: { status: status } };

        dbo.collection("onoff").updateOne({}, newvalue, function(err, result) {
            if (err) throw err;
            console.log("Onoff update succesfull")
            res.send("Onoff update")
            db.close();
        });
    });
});


api.use('/onoff/find', function findOnOff(req, res) {
    console.log("New Onoff find request")

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull")

        dbo.collection("onoff").findOne({}, function(err, result) {
            if (err) throw err;
            console.log("Onoff find succesfull")
            res.send(result.status)
            db.close();
        });
    });
});

module.exports = api;
