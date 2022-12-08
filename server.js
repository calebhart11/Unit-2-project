//import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { urlencoded } = require('express')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurants')
const RestaurantsRouter = require('./controllers/restaurants-router')






//express app
const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/static', express.static('public'))
app.use('/restaurants', RestaurantsRouter)

//home route
app.get('/', (req, res) => {
    res.send('<h1>The server is running</h1>')
})

//server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`I am listening on Port: ${PORT}`))