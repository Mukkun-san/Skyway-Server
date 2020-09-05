let validator = require('validator')
const isEmpty = require('is-empty')

function validatePackage(package) {
    let errors = []

    if (isEmpty(package.place)) {
        errors.push('Place is empty')
    }
    if (isEmpty(package.duration)) {
        errors.push('Duration is empty')
    }
    if (isEmpty(package.imageUrl)) {
        errors.push('Image url is empty')
    }
    if (isEmpty(package.overview)) {
        errors.push('Image url is empty')
    }
    if (isEmpty(package.galleryImagesUrls)) {
        errors.push('galleryImagesUrls is empty')
    }
    if (isEmpty(package.pricing)) {
        errors.push('pricing is empty')
    }
    if (isEmpty(package.includeExclude)) {
        errors.push('includeExclude is empty')
    }
    if (isEmpty(package.itinerary)) {
        errors.push('itinerary is empty')
    }
    if (isEmpty(package.hotels)) {
        errors.push('hotels is empty')
    }
    if (isEmpty(package.description)) {
        errors.push('description is empty')
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

module.exports = validatePackage
