const express = require("express");
//requiring in the routes that are written in notes.js file
const notesRouter = require("./notes");

const app = express();

//middleware that points to notes file, prefixing all routes in this file with /notes
app.use("/notes", notesRouter);

module.exports = app;
