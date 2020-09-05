let mongoose = require('mongoose')

let Pricing = mongoose.Schema({
    name: String,
    cost: {
        standard: String,
        deluxe: String,
        luxury: String,
    },
})

module.exports = mongoose.model('pricing', Pricing)
