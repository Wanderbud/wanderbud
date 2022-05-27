const express = require('express');
const path = require('path');
// const mongoose = require('mongoose'); 
const cors = require('cors');
const dotenv = require('dotenv').config(); //import .env variables

const PORT = 3000;
const app = express();

// mongoose.connect(process.env.MONGOOSE_URL, (err, db)=> {
//   if(!err){
//     console.log('connected to mongoose');
//   } else {
//     console.log(err);
//   }
// })

//routers
const apiRouter = require('./routes/apiRouter');

//parse body request
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors());


//if in production mode, statically serve everything in the build folder on the route '/dist'
if (process.env.NODE_ENV == 'production'){

  app.use('/dist', express.static(path.join(__dirname, '../dist')));

// serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
}


//server logic
app.use('/', apiRouter);










// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Error: Page not found'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;