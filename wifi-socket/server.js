const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000;

const timerAPI = require("./api/timer")
const onoffAPI = require("./api/onoff")
const scheduleAPI = require("./api/schedule")


app.listen(port, () => console.log("Backend server is running on port: "+port));


const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config()

mongoose
    .connect(
        process.env.MONGODB_URL
    )
    .then(() => console.log("MongoDb connection succesfull"))
    .catch((err) => console.log(err))

app.use(express.json())

app.use("/api/timer", timerAPI)
app.use("/api/onoff", onoffAPI)
app.use("/api/schedule", scheduleAPI)

