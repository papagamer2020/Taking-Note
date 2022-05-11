const router = require('express').Router();
let notes = require('../db/db.json');
const fs = require("fs");
const generateUniqueId = require('generate-unique-id');
const { findById } = require('../lib/notes');


router.get('/api/notes', (req, res) => {
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If note is present
    if (req.body) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: generateUniqueId()
        };
        notes.push(newNote)
        console.log(newNote)
        // Convert the data to a string so we can save it
        fs.readFile(`./db/db.json`, `UTF8`, (error, data) => {
            if (error) {
                console.log(error);
            }
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            // Write the string to a file
            fs.writeFile(`./db/db.json`, JSON.stringify(parsedData), (err) => 
                err ? console.error(err) : console.log(`A new note has been written to the JSON file.`)
            )
        });

        const response = {
            status: "success",
            body: newNote
        };

        console.log(response);
        res.json(response);
    } else {
        res.json("Error in posting note");
    }
});

router.delete('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        let newArray = notes.filter((note) => note !== result);
        notes = newArray;
        // Write the string to a file
        fs.writeFile(`./db/db.json`, JSON.stringify(newArray), (err) => 
        err ? console.error(err) : console.log(`The JSON file has been updated.`))
    } else {
        res.send(404);
    }
    res.json(notes);
});

module.exports = router;