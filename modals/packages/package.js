let mongoose = require('mongoose')

let Package = mongoose.Schema({
    place: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    packageName: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        require: true,
    },
    galleryImagesUrls: {
        type: [String],
    },
    pricing: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pricing',
        },
    ],
    includeExclude: {
        include: [String],
        exclude: [String],
    },
    itinerary: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'itinerary',
        },
    ],
    hotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hotel',
        },
    ],
    description: String,
})

module.exports = mongoose.model('package', Package)
