let mongoose = require('mongoose')
const { model } = require('./itinerary')

let Hotel = mongoose.Schema({
    place: String,
    standard: [String],
    deluxe: [String],
    luxury: [String],
})

module.exports = mongoose.model('hotel', Hotel)
