let mongoose = require('mongoose')

let EmailSchema = mongoose.Schema(
    {
        email: {
            required: true,
            type: String
        },
        subscribed: {
            required: true,
            type: Boolean
        },
        nbookings: {
            required: true,
            type: Number
        },
        createdOn: {
            required: true,
            type: Date
        }
    },
    {
        writeConcern: {
            w: 'majority',
            j: true,
            wtimeout: 1000,
        },
    }
)

module.exports = mongoose.model('emails', EmailSchema)
