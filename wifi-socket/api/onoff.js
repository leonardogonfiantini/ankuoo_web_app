const router = require("express").Router()
const OnOff = require("../models/OnOff")

router.post("/insert", async (req, res) => {
        
    console.log("Insert onoff request: ")

    const status = req.body.status

    const newOnOff = new OnOff ({
        status: status
    });

    try {
        const savedOnOff = await newOnOff.save()
        res.status(200).json(savedOnOff)
        console.log(savedOnOff)
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }

})

router.post("/get", async (req, res) => {
    
    console.log("Get Onoff request:")
    
    try {
        const findOnOff = await OnOff.find({})
        res.status(200).json(findOnOff)
        console.log("Request succesfull")
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }
})

router.post("/update", async (req, res) => {
    
    console.log("Update OnOff request:")

    const status = req.body.status

    try {
        const updateOnOff = await OnOff.updateOne({}, {status})
        res.status(200).json(updateOnOff)
        console.log("Request succesfull")
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router