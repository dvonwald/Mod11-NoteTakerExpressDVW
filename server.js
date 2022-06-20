//requiring in modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");

//PORT is either 3001 or whatever Heroku sets/needs to use
const PORT = process.env.PORT || 3001;

//storing the express function inside of the app variable
const app = express();

//Notes from class:
//GET /notes should return the notes.html

//GET * should return the index.html file
//wild card route to direct users to index.html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

//GET /api/notes should read the db.json and return all saved notes as JSON

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Each note needs a unique ID.
app.post;

//Routes referenced in  index.js
//fetch /api/notes - GET
app.get("");

//fetch /api/notes - POST

//fetch /api/notes - DELETE

app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
