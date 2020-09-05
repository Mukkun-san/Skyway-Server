let mongoose = require('mongoose')

let Itinerary = mongoose.Schema({
    day: Number,
    title: String,
    timing: [String],
})

module.exports = mongoose.model(Itinerary)
