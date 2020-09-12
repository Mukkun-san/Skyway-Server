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

const fileUpload = require('express-fileupload');
router.use(fileUpload());

const randomstring = require("randomstring");

router.post('/addPackage', (req, res) => {
    let pkg = JSON.parse(req.body.packageDetails);

    if (req.files) {
        let images = req.files.images;
        const timestamp = Date.now();
        let urls = [];

        images.forEach((image, index) => {
            let = extension = image.name.substr(image.name.lastIndexOf("."), image.name.length)
            let path = "/images/" + timestamp + '_' + randomstring.generate() + extension;
            image.mv('./public' + path)
                .then(() => { })
                .catch((err) => {
                    console.log(err)
                });
            urls.push("https://skyway-server.herokuapp.com" + path)
        });
        pkg.galleryImagesUrls = urls;
        pkg.imageUrl = urls[0];

    } else {
        res.send({ result: false, error: 'No Images Uploaded' })
    }

    let validate = validatePackage(pkg)

    if (validate.result) {
        let aPackage = Package({
            place: toString(pkg.places),
            duration: pkg.duration,
            imageUrl: pkg.imageUrl,
            overview: pkg.overview,
            packageName: pkg.packageName,
            galleryImagesUrls: pkg.galleryImagesUrls,
            includeExclude: pkg.includeExclude,
            description: pkg.description,
        })

        for (let i = 0; i < pkg.pricing.length; i++) {
            let aPricing = Pricing({ name: pkg.pricing[i].noOfGuest, cost: { standard: pkg.pricing[i].stCost, deluxe: pkg.pricing[i].deCost, luxury: pkg.pricing[i].luCost } })
            aPricing.save()
                .then((res) => {

                }).catch((err) => {
                    console.log(err)
                })
            aPackage.pricing.push(aPricing)
        }

        for (let j = 0; j < pkg.itinerary.length; j++) {
            let aItinerary = Itinerary({
                place: pkg.itinerary[j].day + ": " + pkg.itinerary[j].place,
                dec: pkg.itinerary[j].description
            })
            aItinerary.save()
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err)
                })
            aPackage.itinerary.push(aItinerary)
        }

        for (let k = 0; k < pkg.hotels.length; k++) {
            let aHotel = Hotel(pkg.hotels[k])
            aHotel.save()
                .then((res) => {

                }).catch((err) => {
                    console.log(err)
                })
            aPackage.hotels.push(aHotel)
        }
        aPackage.save()
            .then((result) => {
                res.send({
                    msg: 'New package subbmitted successfully',
                    result: result,
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    else {
        res.status(400).send({
            msg: 'Invalid request. Input data validation failed',
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
