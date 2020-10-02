let mongoose = require('mongoose')

let Itinerary = mongoose.Schema({
    day: String,
    place: String,
    description: String,
})

module.exports = mongoose.model('itinerary', Itinerary)
