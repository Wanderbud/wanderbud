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
            const response = await db.query(`SELECT * FROM "journey" WHERE "origin"='${origin}' AND "destination"='${destination}' AND "date"='${date}'`)
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

            foundJourney = await response2.rows;

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


 // Error Handling, what if user has already joined?
journeyController.join = (req, res, next) => {

    const {userID, journeyID} = req.body;
    async function userJourney() {
        try {
                const response = await db.query(`SELECT * FROM "journey" WHERE "id"=${journeyID}`);
                const joinedJourney = await response.rows[0];
                res.locals.join = {...joinedJourney, date: joinedJourney.date.toString().slice(0, 10)}
//NEED TO ADD LOGIC TO JOIN INTO THE TABLE WITH USERID AND JOURNEY ID
                return next();
            }
            catch(err) {
                console.log("Error in creating/joining userJourney instance...");
            }
        }
    
        userJourney();
}

// remove passenger from userJourney with journeyID and userID
journeyController.unjoin = (req, res, next) => {
    const {userID, journeyID} = req.body;

    async function deleteJ() {
        try {
            // let query = `DELETE FROM "userJourney" WHERE "userID"=${res.locals.userID} AND "journeyID"=${res.locals.journeyID}`
            // await db.query(query)
//NEED TO ADD LOGIC TO DELETE ENTRY ABOVE
            res.locals.delete = "Successfully removed join";
            return next();
        }
        catch (err) {
            console.log("Error can't remove join..");
        }
    }

    deleteJ();
}


/* // Update after a journey is completed
// NEED TO calculate distance, calculate totalCost after completing a journey
journeyController.updateEntry = (req, res, next) => {
    const {origin, destination, date} = req.body
    let query = `UPDATE Journey
    SET "distance" = 50, "totalCost" = 600, "completed"='1'
    WHERE "origin"='${origin}' AND "destination"='${destination}' AND "date"='${date}';`
    db.query(query)
    .then(res => {
        return next();
    })
    .catch(err => {
        console.log("Error updating Journey...");
    })
}

//Select journey id 
journeyController.getUpdatedJourneyID = (req, res, next) => {
    const {origin, destination, date} = req.body;

        async function getID() {
            try {
                    let query = `SELECT "id" FROM "journey"
                    WHERE "origin"='${origin}' AND "destination"='${destination}' AND "date"='${date}'`
                    const response = await db.query(query)
                    res.locals.journeyID = response.rows[0].id;
                    return next();
            }
            catch(err) {
                console.log("Error - Can't locate journey ID");
            }
        }
        getID();
}

// find total number of people on journey 
journeyController.totalPeople = (req, res, next) => {
    async function getTotal() {
        try {
                let query = `SELECT u."userID", u."userStatus", j."totalCost" FROM "userJourney" u 
                LEFT JOIN "journey" j ON j."id"=u."journeyID"
                WHERE "journeyID"=${res.locals.journeyID}`
                const response = await db.query(query)
                const array = response.rows;
                let arrayID = [];
                for (let i = 0; i < array.length; i++) {
                    arrayID.push(array[i].userID);
                }
                res.locals.individualCost = (response.rows[0].totalCost)/array.length;
                res.locals.people = arrayID;
                return next();
        }
        catch(err) {
            console.log("Error - Can't find journey members");
        }
    }
    getTotal();
    
}

// Update userJourney table after a journey is completed
// Individual journey cost after completing a journey
journeyController.updateUserJourney = (req, res, next) => {
    console.log("made it: individual cost to update: ",res.locals.individualCost, "for UserID:", res.locals.people);

    for (let i = 0; i < res.locals.people.length; i++) {
        db.query(`UPDATE "userJourney" SET "cost"=${res.locals.individualCost} WHERE "userID"='${res.locals.people[i]}'`)
        .catch(err => {
            console.log("Cant update individual cost for journey...");
        })
    }

    res.locals.updated = "Successfully updated";
    return next();
}

journeyController.checkDriver = (req, res, next) => {
    const email = req.body.email;

    async function checkDriver() {
        try {
                let query = `SELECT j."userStatus" FROM "userJourney" j
                LEFT JOIN "user" u ON j."userID" = u."id"
                WHERE u."email" = '${email}'`
                const response = await db.query(query)
                res.locals.userStatus = response.rows[0].userStatus
                return next();
        }
        catch(err) {
            console.log("Error - Passengers can't delete journey");
        }
    }

    checkDriver();
}

journeyController.getID = (req, res, next) => {
    const {origin, destination, date, email} = req.body;

    async function selectID() {
        try {
                let query = `SELECT j."journeyID", u."id" FROM "userJourney" j
                LEFT JOIN "user" u ON j."userID" = u."id"
                LEFT JOIN "journey" r ON "journeyID" = r."id"
                WHERE u."email" = '${email}' AND r."origin"='${origin}' AND r."destination"='${destination}' AND r."date"='${date}'`
                const response = await db.query(query)
                res.locals.journeyID = response.rows[0].journeyID;
                res.locals.userID = response.rows[0].id;
                return next();
        }
        catch(err) {
            console.log("Error - Can't locate journey ID");
        }
    }
    selectID();
}

journeyController.getUserJourneyID = (req, res, next) => {
    const {origin, destination, date, email} = req.body;

    if (res.locals.userStatus === "driver") {
        async function getID() {
            try {
                    let query = `SELECT j."id" , j."journeyID" FROM "userJourney" j
                    LEFT JOIN "user" u ON j."userID" = u."id"
                    LEFT JOIN "journey" r ON "journeyID" = r."id"
                    WHERE u."email" = '${email}' AND r."origin"='${origin}' AND r."destination"='${destination}' AND r."date"='${date}'`
                    const response = await db.query(query)
                    res.locals.journeyID = response.rows[0].journeyID;
                    return next();
            }
            catch(err) {
                console.log("Error - Can't locate journey ID");
            }
        }
        getID();
    }
    else if (res.locals.userStatus === "passenger") {
        console.log("Error - Passengers can't delete a journey");
        return next(err);  
    } 
}

journeyController.deleteEntry = (req, res, next) => {
    const {origin, destination, date} = req.body

        async function deleteJ() {
            try {
                let query = `DELETE FROM "journey" WHERE "origin"='${origin}' AND "destination"='${destination}' AND "date"='${date}'`
                await db.query(query)
                res.locals.delete = "Successfully deleted journey";
                return next();
            }
            catch (err) {
                console.log("Error can't delete..");
            }
        }

        deleteJ();
}


 */

module.exports = journeyController;