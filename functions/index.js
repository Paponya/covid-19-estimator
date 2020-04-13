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
morgan.token('customUrl', (req) => {
    return req.customUrl
})
app.use(assignCustomUrl)
const tempFilePath = '/tmp/log.txt';
const accessLogStream = fs.createWriteStream(tempFilePath, { flags: 'a' })
app.use(express.json());
// app.use(morgan( (tokens, req, res)=> {
//     return [
//         tokens.method(req, res),
//         tokens.customUrl(req, res),
//         tokens.status(req, res),
//         // tokens.res(req, res, 'content-length'), '-',
//         tokens['response-time'](req, res)[0], 'ms'
//     ].join('\t\t')
// }, { stream: accessLogStream }))
app.use(morgan(':method\t\t:customUrl\t\t:status\t\t:total-time[00] ms', { stream: accessLogStream }))
function assignCustomUrl(req, res, next) {
    req.customUrl = req.url
    next()
}
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
    validateRequest(req, res)
    const response = covid19ImpactEstimator(req.body)
    res.send(response);
}
exports.app = functions.https.onRequest(app);