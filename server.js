const express = require('express');
const path = require('path');
const fs = require("fs")
const everyNote = require('./db/db.json');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json (everyNote.slice(1));
}

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, () => {
  console.log(`Send it`);
});