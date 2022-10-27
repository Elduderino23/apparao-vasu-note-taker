// const variables 
const express = require('express');
const path = require('path');
const fs = require("fs")
var everyNote = require('./db/db.json');
const uuid = require('uuid')
const { text } = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());



app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
  res.json(everyNote)
});

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body

  if (title && text){
    const genTitle = {
      title,
      text,
      id: uuid.v1()
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(genTitle);
        everyNote = parsedNotes;
      
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 3),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Dutifully Noted Sir!')
        );
      }
      res.json(everyNote)

  })
}
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});



app.listen(PORT, () => {
  console.log(`Send it ${PORT}!`);
});