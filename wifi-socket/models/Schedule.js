const mongoose = require("mongoose")

const ScheduleSchema = new mongoose.Schema(
    {
        from: { type: String, required: true },
        to: { type: String, required: true },
        mon: { type: String, required: true },
        tue: { type: String, required: true },
        wed: { type: String, required: true },
        thu: { type: String, required: true },
        fri: { type: String, required: true },
        sat: { type: String, required: true },
        sun: { type: String, required: true },
        status: { type: String, required: true }
    }
)

module.exports = mongoose.model("Schedule", ScheduleSchema)