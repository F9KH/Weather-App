const express = require('express');
const axios = require('axios');
const City = require('../model/Weather');

const router = express.Router();

const mongoose = require('mongoose');
const Weather = require('../model/Weather');
mongoose.connect("mongodb://127.0.0.1:27017/weatherDB", {
  useNewUrlParser: true,
}).catch((err) => console.log(err)).catch((err) => console.log(err))


router.get('/weather/:cityName', async function (req, res) {
    const city = req.params.cityName;
    const API_KEY = "3a4186f0263c83709974c3873f65fa9f";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  
    const response = await axios.get(apiUrl);
    const responseData = response.data;

    const data = {
        name: responseData.name,
        temperature: responseData.main.temp,
        condition: responseData.weather[0].description,
        conditionPic: `https://openweathermap.org/img/wn/${responseData.weather[0].icon}.png`
    }

    // const weather = new Weather (data);
    // weather.save();
  
    res.status(200).json(data);
  });



router.get('/cities', async (req, res) => {
try {
    const cities = await City.find();
    res.json(cities);
} catch (error) {
    console.error("Error fetching city data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
}
});


router.post('/cities', async (req, res) => {
    try {

        const cityData = req.body;
        const newCity = new City(cityData);
        const savedCity = await newCity.save();

        res.status(201).json(savedCity);
    } catch (error) {
        console.error("Error saving city data:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/weather/:cityName', async (req, res) => {
    const city = req.params.cityName;

    try {
        
        const deletedCity = await City.findOneAndDelete({ name: city });

        if (deletedCity) {
            res.json("Successfully deleted");
        } else {
            res.status(404).json("City not found");
        }
    } catch (error) {
        console.error("Error deleting city:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
