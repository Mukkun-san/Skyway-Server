let router = require('express').Router()

let isEmpty = require('is-empty')
let Package = require('../../modals/packages/package')
let Email = require('../../modals/email')

router.post("/findOne/:email", async (req, res) => {
    let email = req.params.email
    const mailregexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let response = {}
    if (email.match(mailregexp)) {
        try {
            let mailExists = await Email.findOne({ email: new RegExp(`^${email}$`, 'i') })
            if (mailExists) {
                response.message = `Your email ${email} is already subscribed!`
                response.type = "warning"
            } else {
                try {
                    new Email({
                        email,
                        subscribed: true,
                        nbookings: 0,
                        createdOn: new Date()
                    }).save()
                    response.message = `Thank you! Your email ${email} was successfully subscribed!`
                    response.type = "success"
                } catch (error) {
                    console.log(error);
                    message = "Error connecting to our server"
                    response.type = "error"
                }

            }
        } catch (error) {
            message = "Error connecting to our server"
            response.type = "error"
        }
    } else {
        message = "Please enter a valid Email"
        response.type = "error"
    }
    res.send(response)
})

router.get('/getAll', (req, res) => {
    Email.find({}, (error, data) => {
        if (error) {
            res.json({ error })
        }
        res.json({ emails: data })
    })
})

module.exports = router
