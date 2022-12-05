//import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { urlencoded } = require('express')
const mongoose = require('mongoose')


//database variables
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
//establish mongo connection
mongoose.connect(DATABASE_URL, CONFIG)

//mongoose connection events
mongoose.connection
.on('open', () => console.log('mongoose connected'))
.on('close', () => console.log('mongoose disconnected'))
.on('error', (error) => console.log('mongoose error', error))




//express app
const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/static', express.static('public'))

//home route
app.get('/', (req, res) => {
    res.send('<h1>The server is running</h1>')
})

//server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`I am listening on Port: ${PORT}`))