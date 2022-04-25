const mongoose = require("mongoose")

const TimerSchema = new mongoose.Schema(
    {
        timer: { type: String, required: true },
        status: { type: String, required: true }
    }
)

module.exports = mongoose.model("Timer", TimerSchema)