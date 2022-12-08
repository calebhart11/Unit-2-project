//import dependencies
const express = require('express')
const Restaurant = require('../models/restaurants')

//create router
const router = express.Router()

//routes
//SEED route
router.get('/seed', (req, res) =>{
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
    Restaurant.deleteMany({}, (err, data)=> {
    Restaurant.create(restaurantsData)
    .then((createdRestaurants) => {
        res.json(createdRestaurants)
    })
    })
})

//index route
router.get('/', (req, res)=> {
    Restaurant.find({})
    .then((restaurants) => {
    res.render('index.ejs', {restaurants})
    console.log('are you working?')
    })
});
//New
router.get('/new', (req, res) => {
    res.render('new.ejs')
});

//delete
router.delete('/:id', async (req, res) => {
   const _id = req.params.id
   const deletedRestaurant =  await Restaurant.findByIdAndDelete(req.params.id)
   if(deletedRestaurant){
    res.redirect('/restaurants')
   }
   })

   //update route
   router.put('/:id', (req, res) => {
    req.body.haveITried = req.body.haveITried === 'on' ? true : false
    Restaurant.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedRestaurant) => {
        res.redirect(`/restaurants/${req.params.id}`)
    })
   })
    

//create
router.post('/', (req, res)=> {
    req.body.haveITried = req.body.haveITried === 'on' ? true : false
    Restaurant.create(req.body, (err, restaurant) => {
        console.log(req.body)
        res.redirect('/restaurants')
        })
    })

//post to favorites page
router.post('/favorites', (req, res)=> {
    req.body.haveITried = req.body.haveITried === 'on' ? true : false
    Restaurant.findByIdAndUpdate(req.body, (err, restaurant) => {
        
        res.redirect('/restaurants/favorites')
        
        
        //res.redirect('/restaurants/favorites')
    })
})

//post to try page
router.post('/try', (req, res)=> {
    req.body.haveITried = req.body.haveITried === 'on' ? true : false
    Restaurant.create(req.body, (err, restaurant) => {
        res.redirect('/restaurants/try')
        
        
        //res.redirect('/restaurants/favorites')
    })
})
//edit route
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id, (err, foundRestaurant) =>{
        res.render('edit.ejs', {restaurant: foundRestaurant})
    })
})

//show
router.get('/:id', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id, (err, restaurant) => {
        console.log(restaurant, "this is the found restaurant")
        res.render('show.ejs', {
            restaurant,
            index: restaurant._id,
            getOne: function(index) {
                return restaurant[index]
            }
        })
    })
});

//export router
module.exports = router