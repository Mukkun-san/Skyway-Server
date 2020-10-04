let router = require('express').Router()

let isEmpty = require('is-empty')
let Package = require('../../modals/packages/package')
let Email = require('../../modals/email')

router.get("/:email", async (req, res) => {
    let email = req.params.email
    let response = {}
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
    res.send(response)
})

module.exports = router
