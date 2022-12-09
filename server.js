//import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { urlencoded } = require('express')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurants')
const RestaurantsRouter = require('./controllers/restaurants-router')
const UserRouter = require('./controllers/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')







//express app
const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/static', express.static('public'))
app.use('/restaurants', RestaurantsRouter)
app.use('/user', UserRouter)
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
}))

//home route
app.get('/', (req, res) => {
    res.render('first.ejs')
})

//server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`I am listening on Port: ${PORT}`))