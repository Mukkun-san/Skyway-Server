let mongoose = require('mongoose')

let Itinerary = mongoose.Schema({
    place: String,
    dec: String,
})

module.exports = mongoose.model('itinerary', Itinerary)
