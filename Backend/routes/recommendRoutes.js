const express = require("express");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

// Define your upload route
router.post("/recommend-plants", async (req, res) => {
    const data = {
        plantType: req.body.plantType,
        waterAvailability: req.body.waterAvailability,
        soilType: req.body.soilType,
        growthHabit: req.body.growthHabit,
        sunlightExposure: req.body.sunlightExposure,
        humidityRequirements: req.body.humidityRequirements,
        careLevel: req.body.careLevel,
        wateringNeeds: req.body.wateringNeeds
    };
    
    axios.post('http://localhost:8000/api/recommend-plants', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.error(error);
    });
});


module.exports = router;
