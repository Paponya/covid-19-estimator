/* eslint-disable */
const express = require('express');
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const xml2js = require('xml2js');
const covid19ImpactEstimator = require('./estimator')
const validateRequest = require('./validator')
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
app.use(express.json());
app.use(morgan('tiny', { stream: accessLogStream }))
app.use('/api/v1/on-covid19/logs', express.static(path.join(__dirname, 'logs/access.log')))
app.post('/api/v1/on-covid-19', (req, res) => {
    jsonResponse(req, res)
});
app.post('/api/v1/on-covid-19/json', (req, res) => {
    jsonResponse(req, res)
});
app.post('/api/v1/on-covid-19/xml', (req, res) => {
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
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))