let router = require('express').Router()

//Validators
let validatePackage = require('../../validator/packageValidator')

//Modals
let Package = require('../../modals/packages/package')
let Pricing = require('../../modals/packages/pricing')
let Itinerary = require('../../modals/packages/itinerary')
let Hotel = require('../../modals/packages/hotels')
let Booking = require('../../modals/packages/booking')

const validateBookingInfo = require('../../validator/bookingInfoValidator')

router.post('/addPackage', (req, res) => {
    let pkg = req.body
    let validate = validatePackage(pkg)

    if (validate.result) {
        let aPackage = Package({
            place: pkg.place,
            duration: pkg.duration,
            imageUrl: pkg.imageUrl,
            overview: pkg.overview,
            packageName: pkg.packageName,
            galleryImagesUrls: pkg.galleryImagesUrls,
            includeExclude: pkg.includeExclude,
            description: pkg.description,
        })

        for (let i = 0; i < pkg.pricing.length; i++) {
            let aPricing = Pricing(pkg.pricing[i])
            aPricing.save()
            aPackage.pricing.push(aPricing)
        }

        for (let j = 0; j < pkg.itinerary.length; j++) {
            let aItinerary = Itinerary(pkg.itinerary[j])
            aItinerary.save()
            aPackage.itinerary.push(aItinerary)
        }

        for (let k = 0; k < pkg.hotels.length; k++) {
            let aHotel = Hotel(pkg.hotels[k])
            aHotel.save()
            aPackage.hotels.push(aHotel)
        }

        aPackage.save()

        res.json({
            msg: 'New package subbmitted successfully',
            result: true,
        })
    } else {
        res.status(400).json({
            msg: 'Invalid request. Input data validatin failed',
            result: false,
            errors: validate.errors,
        })
    }
})

router.get('/getAllPackages', async (req, res) => {
    try {
        let pkg = await Package.find()
            .populate('pricing')
            .populate('itinerary')
            .populate('hotels')
        res.send(pkg)
    } catch (err) {
        res.send(err)
    }
})

router.get('/getPackage/:pacId', (req, res) => {
    let pacId = req.params.pacId

    Package.findById(pacId, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            res.status(500).send(err)
        }
    })
        .populate('pricing')
        .populate('itinerary')
        .populate('hotels')
})

router.post('/bookPackage', (req, res) => {
    let bookingInfo = req.body

    console.log(JSON.stringify(bookingInfo))

    let validate = validateBookingInfo(bookingInfo)

    if (validate.result) {
        let aBooking = Booking({
            ...bookingInfo,
            mobileCode: '+91 India',
        })
        aBooking.save().then((res, err) => {
            if (err) {
                console.log(err)
            }
        })

        res.json({
            result: true,
            msg: 'Booking data subbmitted sucessfully !!!',
        })
    } else {
        res.status(400).json({
            result: false,
            msg: 'Data validation failed',
            errors: validate.errors,
        })
    }
})

router.get('/test', (req, res) => {
    res.send('All working good')
})

router.delete('/removePackage/:pkgId', async (req, res) => {
    let pkgId = req.params.pkgId
    try {
        await Package.deleteOne({ _id: pkgId });
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}
)

module.exports = router
