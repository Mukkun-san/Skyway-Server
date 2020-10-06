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

router.get('/getAllPackages', async (req, res) => {
    try {
        let pkgs = await Package.find()
            .populate('pricing')
            .populate('itinerary')
            .populate('hotels')

        res.send(pkgs)
    } catch (err) {
        res.send(err)
    }

})

router.post('/addPackage', (req, res) => {

    let pkg = req.body;

    console.log(pkg);

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
            category: pkg.category,
            seo: pkg.seo,
            pkgcode: pkg.seo.url,
            imagesAltAttrs: pkg.imagesAltAttrs,
            priceStartsAt: pkg.priceStartsAt
        })

        for (let i = 0; i < pkg.pricing.length; i++) {
            let aPricing = Pricing(pkg.pricing[i])
            if (!pkg.pricing[i]._id)
                aPricing.save()
                    .then((res) => {

                    }).catch((err) => {
                        console.log(err)
                    })
            aPackage.pricing.push(aPricing)
        }

        for (let j = 0; j < pkg.itinerary.length; j++) {
            console.log(pkg.itinerary[j]);

            let aItinerary = Itinerary(pkg.itinerary[j])

            if (!pkg.itinerary[j]._id) {
                aItinerary.save()
                    .then((result) => {

                    }).catch((err) => {
                        console.log(err);
                    });
            }
            aPackage.itinerary.push(aItinerary)
        }

        for (let k = 0; k < pkg.hotels.length; k++) {
            let aHotel = Hotel(pkg.hotels[k])
            if (!pkg.hotels[k]._id) {
                aHotel.save()
                    .then((result) => {

                    }).catch((err) => {
                        console.log(err);
                    });
            }
            aPackage.hotels.push(aHotel)
        }
        aPackage.save()
            .then((result) => {
                res.send({
                    msg: 'New package susbmitted successfully',
                    result: result,
                })
            }).catch((err) => {
                console.log(err)
            })
    }
    else {
        res.send({
            msg: 'Invalid request. Input data validation failed',
            result: false,
            errors: validate.errors,
        })
    }

})

router.get('/getAllPackages', async (req, res) => {
    try {
        let pkgs = await Package.find()
            .populate('pricing')
            .populate('itinerary')
            .populate('hotels')

        res.send(pkgs)
    } catch (err) {
        res.send(err)
    }
})

router.get('/getPackage/:pacId', async (req, res) => {
    let pacId = req.params.pacId

    console.log(pacId);

    Package.findOne({ "pkgcode": new RegExp(`^${pacId}$`, 'i') }, (err, result) => {
        if (!err) {
            console.log(result);
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

        res.send({
            result: true,
            msg: 'Booking data subbmitted sucessfully !!!',
        })
    } else {
        res.status(400).send({
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
