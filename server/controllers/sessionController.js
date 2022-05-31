const { request } = require('express');
const db = require('../../database/dbConnection');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {

    console.log('-- Session Contoller: Verify Log In --');

    const text ='SELECT * FROM "session" WHERE "cookieId" = $1;';
    const values = [req.cookies.ssid];
    
    db.query(text, values)
        .then(response => {
            console.log('');
            next();
        })
        .catch(err => {
            // res.render('../../client/components/LoginDisplay.jsx')
            return next({
                'log': 'Session Controller: Is Logged In - DB Query Error', 
                'message': {err: 'sessionController.isLoggedIn: ERROR: check server logs for details'}
              });
        })
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {

    console.log('-- Session Contoller: Start Session --');

    const text ='INSERT INTO "session" ("cookieId") VALUES ($1);';
    const values = [res.locals.userData.id];
    
    db.query(text, values)
        .then(response => {
            console.log('Start Session');
            next();
        })
        .catch(err => {
            // res.render('../../client/components/LoginDisplay.jsx')
            return next({
                'log': 'Session Controller: Start Session - DB Query Error', 
                'message': {err: 'sessionController.startSession: ERROR: check server logs for details'}
              });
        })

  console.log('SSID Cookie: ', req.cookies);
  return next();
};

module.exports = sessionController;