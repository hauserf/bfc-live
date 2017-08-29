'use strict'

// import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Team = require('./model/teams');

// create instances
var app = express();
var router = express.Router();

//set port to either a predetermined port number or 3001
var port = process.env.API_PORT || 3001;

//db config
var mongoDB = 'mongodb://frank:frank123@ds119682.mlab.com:19682/bfc-app';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure API to use bodyParser and look for Json data in the request body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

// prevent errors from Cross Origin Resource Sharing, set headers to allow CORS with middleware
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //remove cacheing so we get the most recent data
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// set root/route(?) path and initialize API
router.get('/', function(req, res) {
  res.json({message: 'API Initialized'});
});

// adding the /teams route to our /api router
router.route('/teams')
  // retrieve all teams from the database
  .get(function(req, res) {
    // looks at our Team Schema
    Team.find(function(err, teams) {
      if (err)
        res.send(err);
      // responds wigh a json object of our database teams
      res.json(teams)
    });
  })

  // post new team to database
  .post(function(req, res) {
    var team = new Team();
    // body parser lets us use the req.body
    team.name = req.body.name;
    // team.manager = req.body.text;

    team.save(function(err) {
      if (err)
      res.send(err);
      res.json({ message: 'Team successfully added!'})
    });
  });

// use router configuration when we call /api
app.use('/api/v1', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err)
})

// error handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({
        message: err.message
    })

})
