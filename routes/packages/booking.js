let express = require('express')
const validateBookingInfo = require('../../validator/bookingInfoValidator')
let router = express.Router()
let Booking = require('../../modals/packages/booking')
let Joi = require('@hapi/joi')

router.get('/getBookingInfo/:bookingId', (req, res, next) => {
    let bookingId = req.params.bookingId

    try {
        Booking.findById(bookingId, (err, result) => {
            if (err) {
                next(err)
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        next(error)
    }
})

router.post('/bookPackage', (req, res, next) => {
    let bookingInfo = req.body

    let BookingScema = Joi.object({
        fromDate: Joi.string().required(),
        toDate: Joi.string().required(),
        packageId: Joi.string().required(),
        stay: Joi.string().required(),
        adults: Joi.string().required(),
        childrenAbove6: Joi.string().required(),
        childrenBelow5: Joi.string().required(),
        typeAndRoom: Joi.string(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        address: Joi.string(),
        country: Joi.string(),
        state: Joi.string(),
        city: Joi.string(),
        zipcode: Joi.string(),
        mobileNum: Joi.string().required(),
        telephoneNum: Joi.string(),
        emailId: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        }),
        additionalInfo: Joi.string(),
        payableAmount: Joi.string(),
    })

    try {
        let validate = BookingScema.validate(bookingInfo)

        let finalBookingInfo = {
            ...bookingInfo,
            date: new Date().toDateString(),
            paymentStatus: 'not paid',
        }

        let aBooking = Booking(finalBookingInfo)

        aBooking.save((err, room) => {
            if (err) {
                return res.status(500).json({
                    result: false,
                    msg: 'There was issue in booking the package',
                })
            } else {
                res.status(200).json({
                    id: room.id,
                    result: true,
                    msg: 'Subbmited sucessfully',
                })
            }
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
