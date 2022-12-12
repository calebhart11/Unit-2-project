//import dependencies
const mongoose = require('./connection')

//models/schema
const {Schema, model} = mongoose
const restaurantsSchema = new Schema({
    name: String,
    image: String,
    info: String,
    price: String,
    haveITried: Boolean,
    username: String
})

const Restaurant = model('restaurants', restaurantsSchema)

//export model
module.exports = Restaurant