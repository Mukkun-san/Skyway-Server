let router = require('express').Router()
let validateAdmin = require('../../validator/adminValidator')
const mongoose = require('../../db')

const jwt = require('jsonwebtoken')

router.post('/adminAuth', (req, res) => {
    let admin = req.body


    let validate = validateAdmin(admin)
    console.log(validate)

    if (validate.result == true) {
        if (
            admin.username === process.env.MASTER_USERNAME &&
            admin.password === process.env.MASTER_PASSWORD
        ) {
            let token = jwt.sign(
                { username: admin.username, password: admin.password },
                process.env.JWT_PASS
            )

            res.send({
                token: token,
                result: true,
                msg: 'Login successfully completed',
            })
        } else {
            res.send({
                result: false,
                msg: 'Invalid email or password',
            })
        }
    } else {
        res.status(400).send({
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
        res.send({
            result: true,
            msg: 'Token verified successfully',
        })
    } else {
        res.send({
            result: false,
            msg: 'Token verification failed',
        })
    }
})

module.exports = router
