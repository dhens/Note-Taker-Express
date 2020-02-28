const express = require('express');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    const newNote = req.body;
    
    fs.readFile(path.join(__dirname + '/db/db.json'), (err, data) => {
        // Error is thrown if you delete all notes then try to set savedNotes equal to db.json data 
        // This handles an empty db.json file
        let savedNotes;
        try {
            savedNotes = JSON.parse(data);
        }
        catch {
            savedNotes = [];
        }
        savedNotes.push(newNote);

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(savedNotes), err => {
            if (err) throw err;
            console.log('New note added');

        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname + '/db/db.json'), (err, data) => {
        const savedNotes = JSON.parse(data);

        //
        const newNotes = savedNotes.filter(item => {
            return item.id !== req.params.id;
        });

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(newNotes), err => {
            if (err) throw err;
            console.log('Added new note to db.json')

        });

        res.send(`Note ${req.params.id} deleted`);
    });

});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});