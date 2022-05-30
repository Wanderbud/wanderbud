const express = require('express');
const journeyController = require('../controllers/journeyController');
const router = express.Router();

// Driver Creates a Journey
router.post('/create', journeyController.createJourney, journeyController.getJourneyID,
journeyController.createUserJourney, journeyController.getfirstName, journeyController.getJourney, (req, res) => {
    res.status(200).json(res.locals.journey);
}); 

// User searches for a Journey
router.post('/find', journeyController.getEntry, (req, res) => {
    res.status(200).json(res.locals.journey);
});

module.exports = router;