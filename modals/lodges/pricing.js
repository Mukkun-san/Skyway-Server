let mongoose = require('mongoose')

let Pricing = mongoose.Schema({
    singleWeekday: String,
    singleWeekend: String,
    doubleWeekday: String,
    doubleWeekend: String,
    seasonal: String,
})

module.exports = mongoose.model('lodgepricing', Pricing)
