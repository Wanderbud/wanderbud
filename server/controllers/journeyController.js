const { request } = require('express');
const db = require('../../database/dbConnection');

const journeyController = {};

// Middleware to Adding (Posting) a New Journey
journeyController.addJourney = (req, res, next) => {
/* 
    console.log('Controller AddComic: ', req.body);
    const {image, title, price} = req.body;

    // error relation table does not exist if not quoted
    const text ='INSERT INTO "Bookmarks" (image, title, price) VALUES ($1, $2, $3)';
    const values = [image, title, price];

    db.query(text, values)
        .then(response => {
            console.log('Inserted');
            next();
        }) */
}

// Middleware to Get Journey
journeyController.getEntry = (req, res, next) => {

    // console.log('Controller GetComics');

    // db.query('SELECT * FROM "Bookmarks"')
    //     .then(response => {
    //         console.log('Get Comics: ', response.rows);
    //         res.locals.comics = response.rows;
    //         next();
    //     });
}

module.exports = journeyController;