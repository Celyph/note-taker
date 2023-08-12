const path = require('node:path');
const fs = require('fs');
const express = require('express');
const {v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };

    res.sendFile('./public/index.html', options);
});

app.get('/notes', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };

    res.sendFile('./public/notes.html', options);
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const nn = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const loaded = JSON.parse(data);
        loaded.push(nn);
        fs.writeFileSync('./db/db.json', JSON.stringify(loaded));
        res.send(nn);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
