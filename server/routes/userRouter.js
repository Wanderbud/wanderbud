const express = require('express');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

// Create a new user (signup + login)
router.post('/signup/users', 
    userController.signupUser, 
    (req, res) => {
        res.status(200).json(res.locals.userData);
    });

// Log in a user (then authenticate: stretch feature) 
router.post('/login', 
    userController.loginUser, 
    // sessionController.startSession,
    // cookieController.setSSIDCookie,
    (req, res) => {
        res.status(200).json(res.locals.userData);
    });

module.exports = router;