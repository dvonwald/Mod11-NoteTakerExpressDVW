const notes = require("express").Router();
// requiring in filesystem module
const fs = require("fs");

//GET /notes should return the notes.html -- currently not working
// notes.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "./public/notes.html"))
// );

//GET /api/notes should read the db.json and return all saved notes as JSON -- currently not working
// notes.get("/", (req, res) => {
//   fs.readFile(/db/db.json)
//     .then((data) => res.json(JSON.parse(data)));
// });

// //Routes referenced in  index.js
// //fetch /api/notes - GET
// app.get("");

// //POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Each note needs a unique ID.
// //fetch /api/notes - POST
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add note`);

  //object destructuring
  const { title, text, id } = req.body;

  const newNote = {
    title,
    text,
    id: uuid(),
  };
  //have to conver the new object to a string to append to the JSON file
  const noteString = JSON.stringify(newNote);

  fs.appendFile(`/db/db.json`, noteString, (err) =>
    err ? console.error(err) : console.log(`${newNote.title} saved to db.json`)
  );
});

//fetch /api/notes - DELETE -- bonus  points

module.exports = notes;
