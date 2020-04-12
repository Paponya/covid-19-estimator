const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const os = require('os');
const xml2js = require('xml2js');
const cors = require('cors')({ origin: true });
const covid19ImpactEstimator = require('./estimator');
const validateRequest = require('./validator');

const app = express();
app.use(cors);
const tempFilePath =  '/tmp/log.txt';
const accessLogStream = fs.createWriteStream(tempFilePath, { flags: 'a' })
app.use(express.json());
app.use(morgan('tiny', { stream: accessLogStream }))
const baseRoute = '/api/v1/on-covid-19'
app.use(`${baseRoute}/logs`, express.static(tempFilePath))

app.post(baseRoute, (req, res) => {
    jsonResponse(req, res)
});
app.post(`${baseRoute}/json`, (req, res) => {
    jsonResponse(req, res)
});
app.post(`${baseRoute}/xml`, (req, res) => {
    validateRequest(req, res)
    const builder = new xml2js.Builder();
    const response = builder.buildObject(covid19ImpactEstimator(req.body));
    res.type('application/xml');
    res.send(response);
})
function jsonResponse(req, res) {
    console.log(req.body);
    validateRequest(req, res)
    const response = covid19ImpactEstimator(req.body)
    res.send(response);
}
exports.app = functions.https.onRequest(app);