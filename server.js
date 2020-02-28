const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});