require('dotenv').config()

let express = require('express')
let app = express()
let cors = require('cors')

require('./db')

let helmet = require('helmet')
let morgan = require('morgan')
let bodyParser = require('body-parser')

let routes = require('./routes')

//All the middlewares
app.use(cors())
app.use(helmet())
app.use(morgan('common'))
app.use(bodyParser({ extended: true }))
app.use(bodyParser.json())
app.use('/api/v1/', routes)
app.use(express.static('public'))

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(400).json({
        msg: 'There was some problem in the server. Please try again later',
        errors:
            process.env.NODE_ENV === 'production'
                ? 'Cannot show errors in production '
                : err.stack,
    })
    next()
})

//Starting the server
let PORT = process.env.PORT || 4545
app.listen(PORT, () =>
    console.log(`⚡⚡ Server started on port ${PORT} successfully`)
)
