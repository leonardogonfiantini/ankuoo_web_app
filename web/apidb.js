require('dotenv').config();

const express = require('express');

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL;

const api = express.Router();

api.use('/timer/insert', function insertTimer(req, res) {

    res.send("timer/insert");

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
    res.send("time/delete");


});

module.exports = api;
