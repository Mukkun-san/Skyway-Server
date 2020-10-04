let router = require('express').Router()
const auth = require('./auth/auth')
const booking = require('./packages/booking')
const search = require('./utility/search')
const packages = require('./packages/packages')
const email = require('./utility/email')

router.use('/auth', auth)
router.use('/booking', booking)
router.use('/search', search)
router.use('/packages', packages)
router.use('/email', email)

module.exports = router
