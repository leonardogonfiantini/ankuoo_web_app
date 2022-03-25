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

        obj = {timer: timer, status: "0"};

        dbo.collection("timer").insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("Timer inserted with value: "+timer);
            db.close();
        });
    });

    res.send("OK");

});

api.use('/timer/find_all', function insertTimer(req, res) {

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
    res.send("timer/delete");
});

api.use('/time_schedule/insert', function insertTimeSchedule(req, res) {
    res.send("time_schedule/insert");


});

api.use('/time_schedule/delete', function deleteTimeSchedule(req, res) {
    res.send("time_schedule/delete");


});

api.use('/time/insert', function insertTime(req, res) {
    res.send("time/insert");


});

api.use('/time/delete', function deleteTime(req, res) {
    res.send("time/dejjlete");


});

module.exports = api;
