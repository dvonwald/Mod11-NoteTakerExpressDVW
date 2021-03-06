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
app.use(express.json()); // body parser, this is needed anytime you're doing anything with JSON
app.use(express.urlencoded({ extended: true })); // boilerplate middleware for dealing with encoding

//Notes from class:
//GET /notes should return the notes.html -- working
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//GET /api/notes should read the db.json and return all saved notes as JSON -- working
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Each note needs a unique ID. -- working finally
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add note`);
  //object destructuring
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    //have to convert the new object to a string to append to the JSON file
    const noteString = JSON.stringify(newNote);

    readAndAppend(JSON.parse(noteString), `./db/db.json`, (err) =>
      err
        ? console.error(err)
        : console.log(`${newNote.title} saved to db.json`)
    );
  }
});

//fetch /api/notes - DELETE -- bonus  points -- working
app.delete("/api/notes/:id", (req, res) => {
  const noteID = req.params.id;
  // console.log(noteID);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteID);
      console.log(result);

      writeToFile("./db/db.json", result);

      res.json(`Note ${req.params.title} has been deleted`);
    });
});

//GET * should return the index.html file
//wild card route to direct users to index.html -- working
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
