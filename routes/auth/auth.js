let router = require('express').Router()
let validateAdmin = require('../../validator/adminValidator')
const mongoose = require('../../db')

const jwt = require('jsonwebtoken')

router.post('/adminAuth', (req, res) => {
    let admin = req.body

    console.log(req.body)

    let validate = validateAdmin(admin)

    if (validate.result == true) {
        if (
            admin.username === process.env.MASTER_USERNAME &&
            admin.password === process.env.MASTER_PASSWORD
        ) {
            let token = jwt.sign(
                { username: admin.username, password: admin.password },
                process.env.JWT_PASS
            )

            res.json({
                token: token,
                result: true,
                msg: 'Login successfully completed',
            })
        } else {
            res.json({
                result: false,
                msg: 'Invalid email or password',
            })
        }
    } else {
        res.status(400).json({
            msg: 'Admin validation failed',
            result: false,
            errors: validate.errors,
        })
    }
})

router.get('/adminVerifyToken/:token', (req, res) => {
    let token = req.params.token
    let decoded = jwt.verify(token, process.env.JWT_PASS)

    if (
        decoded.username === process.env.MASTER_USERNAME &&
        decoded.password === process.env.MASTER_PASSWORD
    ) {
        res.json({
            result: true,
            msg: 'Token verified successfully',
        })
    } else {
        res.json({
            result: false,
            msg: 'Token verification failed',
        })
    }
})

module.exports = router
