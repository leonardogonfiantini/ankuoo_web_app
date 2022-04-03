require('dotenv').config(); 
const express = require('express'); 
const { MongoClient, ServerApiVersion } = require('mongodb');

var uri = process.env.MONGODB_URL; 
const api = express.Router();  

api.use('/timer/insert', function insertTimer(req, res) {      
    
    var timer = req.query.timer;     
    var status = req.query.status;     
    console.log("New timer insert request: "+timer+" with status: "+status);
           
    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         
    
    try {
        client.connect(err => {

            const collection = client.db("V25").collection("Timer");
            obj = {timer: timer, status: "0"};
            
            collection.insertOne(obj, function(err, res) {
                if (err) throw err;
                console.log("Timer inserted with value: "+timer);
            });
        
        }); 
    } catch (e) {
        console.error(e);
    }   

    client.close();
    
    res.send("OK");  
});

api.use('/timer/find_all', function findallTimer(req, res) {

    console.log("New timer find all request")


    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         
    
    try {
        client.connect(err => {

            const collection = client.db("V25").collection("Timer");            
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log("Timer find_all succesfull")
                res.send(result)
            });
        
        }); 
    } catch (e) {
        console.error(e);
    }   

    client.close();
});

api.use('/timer/delete', function deleteTimer(req, res) {
    
    console.log("New timer delete request")

    var timer = req.query.timer;

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         
    
    try {
        client.connect(err => {

            const collection = client.db("V25").collection("Timer");            
            collection.deleteOne({timer: timer}, function(err, result) {
                if (err) throw err;
                console.log("Timer delete succesfull")
                res.send("Timer eliminato")
            });
        
        }); 
    } catch (e) {
        console.error(e);
    }   

    client.close();
});

api.use('/timer/update', function updateTimer(req, res) {
    
    console.log("New timer update request")

    var timer = req.query.timer;
    var status = req.query.status;

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         
    
    try {
        client.connect(err => {

            const collection = client.db("V25").collection("Timer");  
            var newvalue = { $set: { timer: timer, status: status} };
          
            collection.updateOne({timer: timer}, newvalue, function(err, result) {
                if (err) throw err;
                console.log("Timer update succesfull")
                res.send("Timer update")
            });
        
        }); 
    } catch (e) {
        console.error(e);
    }   

    client.close();
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

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         

    try {
        client.connect(err => {

            const collection = client.db("V25").collection("TimeTable"); 
            obj = {from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun, status: 0};
           
            collection.insertOne(obj, function(err, res) {
                if (err) throw err;
                console.log("Time schedule inserted succesfully");
            });
        
        }); 
    } catch (e) {
        console.error(e);
    }   

    client.close();

    res.send("OK");
});

api.use('/time_schedule/find_all', function findallTimeSchedule(req, res) {

    var from = req.query.from;
    var to = req.query.to;

    var mon = req.query.Mon;
    var tue = req.query.Tue;
    var wed = req.query.Wed;
    var thu = req.query.Thu;
    var fri = req.query.Fri;
    var sat = req.query.Sat;
    var sun = req.query.Sun;

    console.log("New time_schedule find all request")

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         

    try {
        client.connect(err => {

            const collection = client.db("V25").collection("TimeTable"); 
            obj = {from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun, status: 0};
           
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log("Time_schedule find_all succesfull")
                res.send(result)
            });
        
        }); 
    } catch (e) {
        console.error(e);
    }   

    client.close();

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

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         

    try {
        client.connect(err => {

            const collection = client.db("V25").collection("TimeTable"); 
            var newvalue = { $set: {status: status} };

            collection.updateOne({from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun}, newvalue, function(err, result) {
                if (err) throw err;
                console.log("Time_schedule update succesfull")
            });
        
        }); 
    } catch (e) {
        console.error(e);
    }   

    client.close();

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

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         

    try {
        client.connect(err => {

            const collection = client.db("V25").collection("TimeTable"); 

            collection.deleteOne({from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun}, function(err, result) {
                if (err) throw err;
                console.log("Time_schedule deleted succesfull")
                res.send("Time_schedule eliminato")
            });
        
        }); 
    } catch (e) {
        console.error(e);
    }   

    client.close();

});

api.use('/onoff/update', function updateOnOff(req, res) {
    var status = req.query.status;

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         

    try {
        client.connect(err => {

            const collection = client.db("V25").collection("OnOff"); 
            var newvalue = { $set: { status: status } };

            collection.updateOne({}, newvalue, function(err, result) {
                if (err) throw err;
                console.log("Onoff update succesfull")
                res.send("Onoff update")
            });
        });        
    } catch (e) {
        console.error(e);
    }   

    client.close();

});


api.use('/onoff/find', function findOnOff(req, res) {
    console.log("New Onoff find request")

    const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });         

    try {
        client.connect(err => {

            const collection = client.db("V25").collection("OnOff"); 
            
            collection.findOne({}, function(err, result) {
                if (err) throw err;
                console.log("Onoff find succesfull")
                res.send(result.status)
            });
        });        
    } catch (e) {
        console.error(e);
    }   

    client.close();
});

module.exports = api;
