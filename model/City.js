/*
Author: Anas Nasrallah.
Peupose: Weather App.
Date: 13.05.20
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String,
    favourite: Boolean
})

const City = mongoose.model("City", citySchema)
module.exports = City
