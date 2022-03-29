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
    
    var from = req.query.from;
    var to = req.query.to;

    var mon = req.query.Mon;
    var tue = req.query.Tue;
    var wed = req.query.Wed;
    var thu = req.query.Thu;
    var fri = req.query.Fri;
    var sat = req.query.Sat;
    var sun = req.query.Sun;


    console.log("New time_schedule insert request: from ="+from+" to="+to+
                    " mon="+mon+" tue="+tue+" wed="+wed+" thu="+thu+" fri="+fri+" sat="+sat+" sun="+sun);

    try {
        var check = from.split(':');

        if (check.length > 2 || check.length < 1) throw new Error("Time from format not valid");
        if (check[1] > 59) throw new Error("Time from seconds not valid");
        if (from == null) throw new Error('Time from is null');

        check = to.split(":");

        if (check.length > 2 || check.length < 1) throw new Error("Time to format not valid");
        if (check[1] > 59) throw new Error("Time to seconds not valid");
        if (to == null) throw new Error('Time to is null');

    } catch(err) {
        res.send("ERROR Time format not correct");
        throw new Error("Time format not valid");
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull");

        obj = {from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun, status: 0};

        dbo.collection("timetable").insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("Time schedule inserted succesfully");
            db.close();
        });
    });

    res.send("OK");
});

api.use('/time_schedule/find_all', function findallTimeSchedule(req, res) {

    console.log("New time_schedule find all request")

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull")

        dbo.collection("timetable").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log("Time_schedule find_all succesfull")
            res.send(result)
            db.close();
        });
    });


}); 

api.use('/time_schedule/update', function updateTimeSchedule(req, res) {
    var from = req.query.from;
    var to = req.query.to;

    var mon = req.query.Mon;
    var tue = req.query.Tue;
    var wed = req.query.Wed;
    var thu = req.query.Thu;
    var fri = req.query.Fri;
    var sat = req.query.Sat;
    var sun = req.query.Sun;
    var status = req.query.status;

    try {
        var check = from.split(':');

        if (check.length > 2 || check.length < 1) throw new Error("Time from format not valid");
        if (check[1] > 59) throw new Error("Time from seconds not valid");
        if (from == null) throw new Error('Time from is null');

        check = to.split(":");

        if (check.length > 2 || check.length < 1) throw new Error("Time to format not valid");
        if (check[1] > 59) throw new Error("Time to seconds not valid");
        if (to == null) throw new Error('Time to is null');

    } catch(err) {
        res.send("ERROR Time format not correct");
        throw new Error("Time format not valid");
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull")

        var newvalue = { $set: {status: status} };

        dbo.collection("timetable").updateOne({from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun}, newvalue, function(err, result) {
            if (err) throw err;
            console.log("Time_schedule update succesfull")
            db.close();
        });
    });

});

api.use('/time_schedule/delete', function deleteTimeSchedule(req, res) {

    console.log("New time_schedule delete request")
    
    var from = req.query.from;
    var to = req.query.to;

    var mon = req.query.Mon;
    var tue = req.query.Tue;
    var wed = req.query.Wed;
    var thu = req.query.Thu;
    var fri = req.query.Fri;
    var sat = req.query.Sat;
    var sun = req.query.Sun;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Db connection succesfull")

        dbo.collection("timetable").deleteOne({from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun}, function(err, result) {
            if (err) throw err;
            console.log("Time_schedule deleted succesfull")
            res.send("Time_schedule eliminato")
            db.close();
        });
    });

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
