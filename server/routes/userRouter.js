const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Create a new user
/* router.post('/login', userController.addUser, (req, res) => {
    // code
}); */

// Login a user (then authenticate: stretch feature) 
/* router.get('/login', userController.getUser, (req, res) => {
    // code
}); */

module.exports = router;