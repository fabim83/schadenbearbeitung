const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Port setzten
app.set('port', (process.env.PORT || 3000));

var db;

MongoClient.connect('mongodb://test:test5101@ds127321.mlab.com:27321/schadenbearbeitung', (err, client) => {
    if (err) return console.log(err);
    db = client.db('schadenbearbeitung');

    app.listen(app.get('port'), "192.168.2.100", function () {
        console.log('Server auf Port ' + app.get('port') + ' gestartet.')
    });
});

app.post('/schaden-anlegen', (req, res) => {
    db.collection('schaeden').save(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('saved to database');
            res.sendStatus(200);
        }
    });
});

app.get('/schaeden-lesen', (req, res) => {
    var query = { bestandskontonummer: req.query.bestandskontonummer };
    db.collection('schaeden').find(query).toArray((err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(result);
        }
    });
});