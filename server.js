//import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { urlencoded } = require('express')
const mongoose = require('mongoose')
// const restaurantsData = require('./models/restuarants')


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

//models/schema
const {Schema, model} = mongoose
const restaurantsSchema = new Schema({
    name: String,
    image: String,
    info: String,
    price: String,
    haveITried: Boolean
})

const Restaurant = model('restaurants', restaurantsSchema)

const restaurantsData = [
    {name: 'Chipotle', image: 'https://i.imgur.com/8kSimNx.png', info: 'Chipotle Mexican Grill, Inc. , often known simply as Chipotle, is an American chain of fast casual restaurants specializing in bowls, tacos and Mission burritos made to order in front of the customer.', price: '$', haveITried: false},
    {name: "Carl's Jr.", image:'https://i.imgur.com/cHp5F4D.jpg', info: "Carl's Jr. Restaurants LLC is an American fast food restaurant chain operated by CKE Restaurant Holdings, Inc., with franchisees in North & South America, Asia, Oceania, Europe and Africa.", price: "$", haveITried: false},
    {name: "Stanford's Restaurant & Bar", image: 'https://i.imgur.com/VWBxS5j.jpg', info: "Stanford's is a classic American steakhouse focused on traditional ingredients with complex flavors. Our family-friendly atmosphere welcomes all for dine-in, takeout, and catering from our diverse menu, crafted to satisfy all of your cravings.", price: '$$', haveITried: false},
    {name: 'Bourbon Street Kitchen & Bar', image: 'https://i.imgur.com/Z2ga0Fm.jpg', info: ' Bourbon Street Creole Kitchen and Bar is a place where people can meet to enjoy our special dishes, craft cocktails and comfortable atmosphere.', price: '$$',haveITried: false},
    {name: 'Gyro Bites', image:'https://i.imgur.com/F7SzHRH.jpg', info: 'Here at Gyro Bites we serve Greek cuisine such as lamb & beef gyro, classic gyro sandwich, falafel sandwich, and more!', price: '$', haveITried: false},
    {name: "Mastro's Steakhouse", image: 'https://i.imgur.com/wNsx641.png', info: "Mastro`s Restaurants, LLC is a collection of sophisticated, classic steakhouses and sumptuous fish houses.", price: '$$$', haveITried: false},
    {name: "Raising Cane's", image: 'https://i.imgur.com/hx1e9qz.png', info: "Raising Cane's Chicken Fingers is an American fast-food restaurant chain specializing in chicken fingers founded in Baton Rouge, Louisiana by Todd Graves and Craig Silvey in 1996.", price: "$", haveITried: false},
    {name: "Trapper's Sushi", image: 'https://i.imgur.com/lj0pUDF.png', info: "Local Japanese chain featuring cooked dishes, specialty rolls & an all-you-can-eat sushi deal.", price: "$$", haveITried: false},
    {name: "Jersey Mike's Subs", image: 'https://i.imgur.com/SKmKIoU.png', info: "Jersey Mike's Subs makes a Sub Above - fresh sliced, authentic Northeast-American style sub sandwiches on fresh baked bread. Subs are prepared Mike's Way.", price: '$$', haveITried: false}
]


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
//SEED route
app.get('/restaurants/seed', (req, res) =>{
    Restaurant.create(restaurantsData)
    .then((createdRestaurants) => {
        res.json(createdRestaurants)
    })
})

//index route
app.get('/restaurants', (req, res)=> {
    Restaurant.find({})
    .then((restaurantsData) => {
    res.render('index.ejs', {restaurantsData})
    console.log('are you working?')
    })
});

//show
app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id, (err, restaurant) => {
        res.render('show.ejs', {
            restaurant: restaurantsData[req.params.id],
            index: req.params.id,
            getOne: function(index) {
                return restaurantsData[index]
            }
        })
    })
})

//server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`I am listening on Port: ${PORT}`))