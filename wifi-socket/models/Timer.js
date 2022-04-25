const mongoose = require("mongoose")

const TimerSchema = new mongoose.Schema(
    {
        timer: { type: String },
        status: { type: String }
    }
)

module.exports = mongoose.model("Timer", TimerSchema)