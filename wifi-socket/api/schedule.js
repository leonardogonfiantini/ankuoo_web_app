const router = require("express").Router()
const Schedule = require("../models/Schedule")

router.post("/insert", async (req, res) => {
    
    console.log("Insert schedule request: ")

    const from = req.body.from
    const to = req.body.to
    const mon = req.body.mon
    const tue = req.body.tue
    const wed = req.body.wed
    const thu = req.body.thu
    const fri = req.body.fri
    const sat = req.body.sat
    const sun = req.body.sun
    const status = req.body.status

    const newSchedule = new Schedule ({
        from: from,
        to: to,
        mon: mon,
        tue: tue,
        wed: wed,
        thu: thu,
        fri: fri,
        sat: sat,
        sun: sun,
        status: status
    });

    try {
        const savedSchedule = await newSchedule.save()
        res.status(200).json(savedSchedule)
        console.log(savedSchedule)
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }

})

router.post("/getAll", async (req, res) => {
    
    console.log("GetAll schedule request:")
    
    try {
        const findSchedules = await Schedule.find({})
        res.status(200).json(findSchedules)
        console.log("Request succesfull")
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }
})

router.post("/update", async (req, res) => {
    
    console.log("Update schedule request: ")

    const from = req.body.from
    const to = req.body.to
    const mon = req.body.mon
    const tue = req.body.tue
    const wed = req.body.wed
    const thu = req.body.thu
    const fri = req.body.fri
    const sat = req.body.sat
    const sun = req.body.sun
    const status = req.body.status

    try {
        const updateSchedule = await Schedule.updateOne({from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun},{status: status})
        res.status(200).json(updateSchedule)
        console.log("Request succesfull")
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

})

router.post("/delete", async (req, res) => {
    
    console.log("Delete schedule request: ")

    const from = req.body.from
    const to = req.body.to
    const mon = req.body.mon
    const tue = req.body.tue
    const wed = req.body.wed
    const thu = req.body.thu
    const fri = req.body.fri
    const sat = req.body.sat
    const sun = req.body.sun

    try {
        const deleteSchedule = await Schedule.deleteOne({from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun})
        res.status(200).json(deleteSchedule)
        console.log("Request succesfull")
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }


})

module.exports = router