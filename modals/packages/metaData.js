let mongoose = require('mongoose')

let Meta = mongoose.Schema(
    {
        package_name: String,
        package_code: String,
        meta_keywords: String
    }
)

module.exports = mongoose.model('metas', Meta)
