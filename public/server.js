const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

//Notes from class:
//GET /notes should return the notes.html

//GET * should return the index.html file

//GET /api/notes should read the db.json and return all saved notes as JSON

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Each note needs a unique ID.

//Routes in  index.js
//fetch /api/notes - GET

//fetch /api/notes - POST

//fetch /api/notes - DELETE

//wild card route to direct users to index.html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
