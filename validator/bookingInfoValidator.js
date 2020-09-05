const isEmpty = require('is-empty')

function validateBookingInfo(data) {
    let problems = []

    if (isEmpty(data.fromDate)) {
        problems.push('No from date provided')
    }

    if (isEmpty(data.toDate)) {
        problems.push('No to date provided')
    }

    if (isEmpty(data.packageId)) {
        problems.push('No package id provided')
    }

    if (isEmpty(data.stay)) {
        problems.push('No stay provided')
    }

    if (isEmpty(data.firstName)) {
        problems.push('No first name provided')
    }

    if (isEmpty(data.lastName)) {
        problems.push('No last name provided')
    }

    if (isEmpty(data.mobileNumber)) {
        problems.push('No mobile number provided')
    }

    if (isEmpty(data.payableAmount)) {
        problems.push('No payable amount found')
    }

    if (problems.length != 0) {
        return {
            result: false,
            errors: problems,
        }
    } else {
        return {
            result: true,
            errors: null,
        }
    }
}

module.exports = validateBookingInfo
