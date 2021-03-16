const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const config = require('../config/appconfig');

const app = express();

app.set('config', config);
app.use(bodyParser.json());


process.on('SIGINT', () => {
    console.log('stopping the server', 'info');
    process.exit();
});

app.set('port', process.env.DEV_APP_PORT);

app.use((req, res, next) => {
    console.log(req, 'info');
    next();
});


app.use((req, res, next) => {
    console.log('the url you are trying to reach is not hosted.', 'error');
    const err = new Error('Not Found');
    err.status = 404;
    res.status(err.status).json({ type: 'error', message: 'the url you are trying to reach is not hosted.' });
    next(err);
});

module.exports = app;
