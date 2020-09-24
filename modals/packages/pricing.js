let mongoose = require('mongoose')

let Pricing = mongoose.Schema({
    name: String,
    cost: Object,
})

module.exports = mongoose.model('pricing', Pricing)
