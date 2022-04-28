const router = require("express").Router()
const Timer = require("../models/Timer")

router.post("/insert", async (req, res) => {
        
    console.log("Insert timer request: ")

    const timer = req.body.timer
    const status = req.body.status

    const newTimer = new Timer ({
        timer: timer,
        status: status
    });

    try {
        const savedTimer = await newTimer.save()
        res.status(200).json(savedTimer)
        console.log(savedTimer)
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }

})

router.post("/getAll", async (req, res) => {
    
    console.log("GetAll timers request:")
    
    try {
        const findTimers = await Timer.find({})
        res.status(200).json(findTimers)
        console.log("Request succesfull")
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }
})

router.post("/update", async (req, res) => {
    console.log("Update timer request: ")

    const timer = req.body.timer
    const status = req.body.status === '1' ? Math.floor(Date.now()/1000) : '0'

    try {
        const updateTimer = await Timer.updateOne({timer: timer}, {status: status})
        res.status(200).json(updateTimer)
        console.log("Request succesfull")
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

})

router.post("/delete", async (req, res) => {
    console.log("Delete timer request: ")

    const timer = req.body.timer
    
    try {
        const deleteTimer = await Timer.deleteOne({timer: timer})
        res.status(200).json(deleteTimer)
        console.log("Request succesfull")
    } catch (err) {
        res.send(500).json(deleteTimer)
        console.log(err)
    }
})

module.exports = router