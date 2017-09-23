'use strict'

// import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Jimp = require('jimp');

// import twitter dependencies
var dotenv = require('dotenv');
var Twit = require('twit');
var fs = require('fs');

// Models
//var Team = require('./model/teams');

// Api
var teamApi = require('./src/api/teamApi');
var scheduleApi = require('./src/api/scheduleApi');

dotenv.config();

// create instances
var app = express();
var router = express.Router();

/* eslint-disable key-spacing */
/*
const twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});
*/
/* eslint-enable */

// db config
/*
var mongoDB = 'mongodb://frank:frank123@ds119682.mlab.com:19682/bfc-app';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

// configure API to use bodyParser and look for Json data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// prevent errors from Cross Origin Resource Sharing, set headers to allow CORS with middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //remove cacheing so we get the most recent data
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var initialState = {
    teamCode: "",
    teamCodeMatched: false,
    scheduleID: "321",
    roster: [],
    timeLive: 0,
    clockState: false,
    lengthOfHalf: 2700,
    lengthOfGame: 5400,
    teamBFC: "Beyond FC",
    teamOPP: "Opponent",
    beyondScore: 0,
    oppScore: 0,
    currentButtonState: 0,
    lister: [],
    format: "11v11",
    sentiment: "inputNeeded",
    data: [],
    pollInterval: 2000,
    tweetUpdates: false
}

var initialized = false
var runningState = {}

////////////////////////////////////////////////////////
// STATE API //
////////////////////////////////////////////////////////

app.get('/api/teams/:id', (req, res) => {
    res.json(teamApi.teams.filter((team) => team.id === req.params.id));
});

app.get('/api/schedules/:id', (req, res) => {
    res.json(scheduleApi.filter((schedule) => schedule.id === req.params.id));
});

app.get('/api/state', (req, res) => {
    if (!initialized) {
        runningState = initialState;
        initialized = true;
    }
    res.json(runningState);
});

app.post('/api/state', (req, res) => {
    const newState = req.body;
    if (!initialized) {
        runningState = initialState;
        initialized = true;
    }
    console.log(newState);
    runningState = { ...runningState, ...newState }
});


////////////////////////////////////////////////////////
// TWEET TEXT ONLY //
////////////////////////////////////////////////////////

app.post('/api/tweet', (req, res) => {
    console.log({ origin: req.headers, body: req.body });

    const tweet = `${req.body.tweet}`;

    twitter.post('statuses/update', { status: tweet }, (err, data, response) => {
        if (err) throw Error(err);
        // console.log({ data, response });
        //
        // res.header('Content-Type', 'application/json');
        // res.json(JSON.stringify({ tweet, success: true }));
    });
});

const port = process.env.PORT || 3100;
app.listen(port, () => {
    console.log(`api running on port ${port}`);
});
