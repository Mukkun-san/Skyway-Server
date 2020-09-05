let mongoose = require('mongoose')

let Lodge = mongoose.Schema({
    overview: {
        type: String,
        required: true,
    },
    gallery: [String],
    pricing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lodgepricing',
    },
    additionalInfo: [String],
    includes: [String],
    excludes: [String],
})

module.exports = mongoose.model('lodge', Lodge)
