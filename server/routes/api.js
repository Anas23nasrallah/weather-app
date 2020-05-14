/*
Author: Anas Nasrallah.
Peupose: Weather App.
Date: 13.05.20
*/

const express = require('express')
const router = express.Router()
const axios = require('axios')
const mongoose = require('mongoose')
const City = require("../../model/City.js")
mongoose.connect("mongodb://localhost/weatherDB")
const APIkey = "db53963c0dc3c0c6291a3c33e211870c"

router.get('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName;
    const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`)
    const conditionPic = `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
    const city = new City({
        name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        temperature: Math.floor(data.data.main.temp),
        condition: data.data.weather[0].description,
        conditionPic: conditionPic,
        favourite: false
    })
    res.send(city)
})

router.get('/cities', async function (req, res) {
    const cities = await City.find({});
    res.send(cities)
})

router.post('/city', async function (req, res) {
    const city = new City({
        name: req.body.name,
        temperature: req.body.temperature,
        condition: req.body.condition,
        conditionPic: req.body.conditionPic,
        favourite: true
    })
    await city.save();
    res.send();
})

router.delete('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName;
    await City.deleteOne({
        name: cityName
    })
    res.send()
})

router.put('/changeFavourite/:cityName/:changeTo', async function (req, res) {
    const cityName = req.params.cityName;
    const changeTo = req.params.changeTo;
    console.log('in the api', cityName, typeof changeTo)
    if (changeTo === 'true') {
        await City.updateOne({ name: cityName }, { favourite: true });
        res.send()
    } else {
        await City.updateOne({ name: cityName }, { favourite: false });
        res.send()
    }
})

module.exports = router