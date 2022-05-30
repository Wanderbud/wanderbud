const express = require('express');
const journeyController = require('../controllers/journeyController');
const router = express.Router();

// Create a journey
/* router.post('/', journeyController.addJourney, (req, res) => {
    // code
}); */

// Search for a journey
/* router.get('/', journeyController.getEntry, (req, res) => {
    // code
}); */
  
// Update after a journey is completed
// ---- userJourney table: Individual journey cost after completing a journey
// ---- Journey Table: completed (1) after completing a journey 
/* router.patch('/:completed', journeyController.updateEntry, (req, res) => {
    // code
}); */

// Delete Journey
/* router.delete('/', journeyController.deleteEntry, (req, res) => {
    // code
}); */

module.exports = router;