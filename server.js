//requiring in modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");

//PORT is either 3001 or whatever Heroku sets/needs to use
const PORT = process.env.PORT || 3001;

//storing the express function inside of the app variable
const app = express();

//Middleware
app.use(express.static("public"));

//Notes from class:
//GET /notes should return the notes.html -- working
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//GET /api/notes should read the db.json and return all saved notes as JSON
// app.get("/api/notes", (req, res) => {
//   fs.readFile("/db/db.json", "utf8", (err, data) => {
//     .then((data) => res.json(JSON.parse(data));
//   }
// });

// app.get("/api/notes", (req, res) => {
//   fs.readFile("/db/db.json", "utf8", (err, data) => {
//     res.json(JSON.parse(data));
//   });
// });

app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//GET * should return the index.html file
//wild card route to direct users to index.html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
