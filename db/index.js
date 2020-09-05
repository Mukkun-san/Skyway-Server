let mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

let db = mongoose.connection

db.on('open', () => {
    console.log('⚡⚡ Connected to the database sucessfully')
})

db.on('error', (error) => {
    console.error(error)
})

module.exports = mongoose
