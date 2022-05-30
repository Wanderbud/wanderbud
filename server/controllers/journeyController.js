const { request } = require('express');
const db = require('../../database/dbConnection');
const { use } = require('../routes/journeyRouter');

const journeyController = {};

// Creates a Journey
// Recieves origin, destination, date, driver, userID from Front End
journeyController.createJourney = (req, res, next) => {
    const {origin, destination, date} = req.body;

    // create a instance in journey table: origin, destination, date, distance=0, totalCost=0, completed=0
    const query = `INSERT INTO "journey" ("origin", "destination", "date") VALUES ('${origin}', '${destination}', '${date}')`
    db.query(query)
    .then(res => {
        return next();
    })
    .catch(err => {
        console.log("Error creating Journey...");
    })
}

// Get JourneyID of journey just created
journeyController.getJourneyID = (req, res, next) => {
    const {origin, destination, date} = req.body;
    let journeyID;

    async function gettingID() {
        try {
            // get id of journey just created 
            const response = await db.query(`SELECT "id" FROM "journey" WHERE "origin"='${origin}' AND "destination"='${destination}' AND "date"='${date}'`)
            journeyID = await response.rows[0].id;
            console.log("Journey ID:", journeyID);
            res.locals.journeyID = journeyID;
            return next(); 
        }
        catch(err) {
            console.log("Error selecting JourneyID...");
        }
    }
    gettingID();
}

// Create instance in User Journey Table
journeyController.createUserJourney = (req, res, next) => {
    const {driver, user_id} = req.body
    console.log('User ID: ', user_id);
    const journey_id = res.locals.journeyID

    // create a instance in userJourney table: userID, journeyID, cost=0, driver 
    const query = `INSERT INTO "userJourney" ("userID","journeyID","driver") VALUES (${user_id},${journey_id},'${driver}');`
    db.query(query)
    .then(res => {
        return next();
    })
    .catch(err => {
        console.log("Error creating UserJourney...");
    })    
}

// Get firstName from User ID
journeyController.getfirstName = (req, res, next) => {
    const {user_id} = req.body;

    async function getName() {
        try {
            const response = await db.query(`SELECT "firstName" FROM "user" WHERE "id"=${user_id}`)
            firstN = await response.rows[0].firstName;
            res.locals.firstN = firstN;
            return next(); 
        }
        catch(err) {
            console.log("Error finding first name...");
        }
    }
    getName();
}

// send back created journey that was just created: 
// journeyID, origin, destination, date, creatorObject {userID, firstName}, distance
journeyController.getJourney = (req, res, next) => {
    const {origin, destination, date, user_id} = req.body;
    console.log("First Name here too!",res.locals.firstN)
    
    async function getJourney() {
        try {
            const response = await db.query(`SELECT * FROM "journey" WHERE "origin"='${origin}' AND "destination"='${destination}' AND "date"='${date}' AND "completed"='0'`)
            foundJourney = await response.rows;
            let creator = {user_id:user_id, firstName:res.locals.firstN}
            let journey = {'journey_id':foundJourney[0].id, 'origin':foundJourney[0].origin, 'destination':foundJourney[0].destination, 
            'date':foundJourney[0].date.toString().slice(0, 10), 'creator':creator, 'distance':foundJourney[0].distance}
            let result = [journey]
            res.locals.journey = result
            return next();
        }
        catch(err) {
            console.log("Error can not find journey...");
        }
    }
    
    getJourney();
}

// send back journeys that match origin, destination and date
// array of objects, each object includes: journeyID, origin, destination, date, distance
journeyController.getEntry = (req, res, next) => {
    const {origin, destination, date} = req.body;
    console.log('request items', origin)
    async function getJourney() {
        try {
            // const response = await db.query(`SELECT * FROM "journey" WHERE "origin"='${origin}' AND "destination"='${destination}' AND "date"='${date}' AND "completed"='0'`)
            const response2 = await db.query(`
            SELECT * FROM (SELECT j.*, uj."userID", u."firstName", u."lastName"
            FROM "journey" j 
            FULL JOIN "userJourney" uj
            ON j."id" = uj."journeyID"
            FULL JOIN "user" u
            ON uj."userID" = u."id"
            WHERE uj."userID" IS NOT NULL) AS A
            WHERE A."origin"='${origin}' and A."destination"='${destination}' and A."date"='${date}'`);
            console.log('find query', response2)
            foundJourney = await response2.rows;
            console.log('foundJourney', foundJourney)
            console.log('data type', foundJourney[0].date)
            let result = [];
            for (let i = 0; i < foundJourney.length; i++) {
                let creator = {user_id:foundJourney[i].userID, firstName:foundJourney[i].firstName}
                let journey = {'journey_id':foundJourney[i].id, 'origin':foundJourney[i].origin, 'destination':foundJourney[i].destination, 
                'date':foundJourney[i].date.toString().slice(0, 10), 'creator':creator, 'distance':foundJourney[i].distance}
                result.push(journey)
            }
            res.locals.journey = result;
            return next();
        }
        catch(err) {
            console.log("Error can not find journey...");
        }
    }
    
    getJourney();
}

module.exports = journeyController;