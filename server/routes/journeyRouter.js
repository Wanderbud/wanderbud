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

// Passenger Joins a Journey
router.post('/join', journeyController.join, journeyController.createUserJourney, (req, res) => {
    res.status(200).json(res.locals.join);
});

// Passenger Removes themselves from a journey
router.delete('/join', journeyController.unjoin, (req, res) => {
    res.status(200);
}); 

// Gets all of user journeys for their profile
// Send back an array of journey objects. Each object has origin, destination and date
// Add a completed button on front end portion on journeys here
router.get('/profile', journeyController.userJourneys, (req, res) => {
    res.status(200).json(res.locals.allJourneys);
});

/* // Update after a journey is completed
router.patch('/', journeyController.updateEntry, journeyController.getUpdatedJourneyID, 
journeyController.totalPeople, journeyController.updateUserJourney, (req, res) => {
    res.status(200).json(res.locals.updated);
}); */

// Driver deletes a Journey
router.delete('/', journeyController.unjoin, journeyController.deleteEntry, (req, res) => {
    res.status(200).json(res.locals.delete);
}); 

module.exports = router;