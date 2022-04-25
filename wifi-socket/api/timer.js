const router = require("express").Router()

router.get("/prova", (req, res) => {
    res.json({ 
        express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' 
    })
})

module.exports = router