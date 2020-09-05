const isEmpty = require('is-empty')
const { isEmail } = require('validator')

function validateAdmin(admin) {
    let errors = []

    if (isEmpty(admin.username)) {
        errors.push('No email id provided')
    } else if (!isEmail(admin.username)) {
        errors.push('Given email is not valid')
    }

    if (isEmpty(admin.password)) {
        errors.push('No password provided')
    }

    if (errors.length === 0) {
        return {
            result: true,
            errors: null,
        }
    } else {
        return {
            result: false,
            errors: errors,
        }
    }
}

module.exports = validateAdmin
