const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs = require('fs');
const diagDB = require('../db/diagnostics.json')


// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  //We imported our diagJSOn, then we said to return the RESPONSE in JSON Format of our stuff.

  res.json(diagDB);
  // fs.readFile('../db/diagnostics.json', 'utf8', (err, data) => {
  //   console.log(data);
  // })
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  //I have to store information about invalid form submissions.

  var { tipREQ, topicREQ, usernameREQ} = req.body;

  const invalidInfo = {
    time: Date.now(),
    error_id: uuidv4(),
    errors: {
      tip: tipREQ,
      topic: topicREQ,
      username: usernameREQ,
    }
  }
  let parsed = JSON.parse(diagDB);
  console.log(parsed);
  console.log(typeof(parsed));
  //How do I store information?

  //FS allows us to work with the file system.
  //I'm probably going to get a bunch of invalid forms, and I probably want to
  //Keep track of all of them.
  //This means, I have to create some kind of list object inside of a JSON obect.
  //This means, I have to read the json file, parse it, push my invalid form into that list
  //Save that list, and re-write it to an updated diagnostics .json
  //When I am receiving logs, I am getting it from the req.body

  //How would I even see what is coming back from the req.body?
  //I could make a request to post info to diagnostics.api?



    //Time looks like a unix time code.
    //Error ID looks like it's generated... somehow?
    //Error object, also looks automatically generated.. somehow.



  // TODO: Logic for appending data to the db/diagnostics.json file
  // fs.readFile(diagDB, (err, data) => {
  //   if(err) {
  //     console.log(err)
  //   } else {
  //     console.log(data)
  //   }
  //   console.log(data);
  //   res.status(201);
  // });

});

module.exports = diagnostics;

// {
//   "time": 1616087317843,
//   "error_id": "ca0616fa-f603-4d85-a9c6-fa62c73a9bf9",
//   "errors": {
//     "tip:": "Tip must be at least 15 characters long",
//     "topic": "",
//     "username": " Username is too short"
//   }
// }
