let mongoose = require('mongoose')

let BookingScema = mongoose.Schema(
    {
        fromDate: {
            required: true,
            type: String,
        },

        toDate: {
            required: true,
            type: String,
        },

        packageId: {
            required: true,
            type: String,
        },

        adults: {
            required: true,
            type: String,
        },

        childrenBelow6: {
            required: true,
            type: String,
        },

        childrenAbove6: {
            required: true,
            type: String,
        },

        stay: {
            required: true,
            type: String,
        },

        typeAndRoom: String,

        firstName: {
            required: true,
            type: String,
        },

        lastName: {
            required: true,
            type: String,
        },

        address: String,

        country: String,

        state: String,

        city: String,

        zipcode: String,

        mobileNum: {
            required: true,
            type: String,
        },

        telephoneNum: String,
        emailId: {
            required: true,
            type: String,
        },
        additionalInfo: String,
        paymentStatus: {
            required: true,
            type: String,
        },
        payableAmount: {
            required: true,
            type: String,
        },
        date: {
            required: true,
            type: String,
        },
    },
    {
        writeConcern: {
            w: 'majority',
            j: true,
            wtimeout: 1000,
        },
    }
)

module.exports = mongoose.model('bookings', BookingScema)
