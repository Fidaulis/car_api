const express = require('express');
const Config = require('./app/config/config');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
require('dotenv').config()

const User = require('./app/route/User')
const Car = require('./app/route/Car')

// Parse l'application urlEncode
app.use(bodyParser.urlencoded({ extended: false }));
// Parse l'application JSON
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());
app.use(cors());


app.use('/uploads/', express.static(__dirname + '/uploads'));

app.use(function (req, res, next) {
    req.origin_protocol = 'http';
    // Force en https l'attribut protocol
    if (req.protocol === 'http' && req.get('host') && !req.get('host').includes('localhost')) {
        req.origin_protocol = 'https';
    }
    next();
});


app.use('/api/user', User);
app.use('/api/car', Car);

app.get('/', (req, res) => {
    res.send(
        `<h1>
            Welcome to Parking API
        </h1>
        `
    )
})

app.listen(Config.serverPort, () => console.info(`Server listen in PORT: ${Config.serverPort}...`));
