const router = require("express").Router()

router.get("/prova", (req, res) => {
    res.send("prova")
})

module.exports = router