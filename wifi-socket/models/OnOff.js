const mongoose = require("mongoose")

const OnOffSchema = new mongoose.Schema(
    {
        status: { type: String, required: true },
        time: { type: Number, required: true}
    }
)

module.exports = mongoose.model("OnOff", OnOffSchema)