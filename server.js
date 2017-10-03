'use strict'

// import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Team = require('./model/teams');
var Jimp = require ('jimp');

// import twitter dependencies
var dotenv = require('dotenv');
var Twit = require('twit');
var fs = require('fs');
var path = require('path');
dotenv.config();

// create instances
var app = express();
var router = express.Router();

/* eslint-disable key-spacing */
let twitter = null
if (process.env.TWITTER_CONSUMER_KEY
        && process.env.TWITTER_CONSUMER_SECRET
        && process.env.TWITTER_ACCESS_TOKEN
        && process.env.TWITTER_ACCESS_TOKEN_SECRET) {
    console.log('Configuring Twitter...')
    twitter = new Twit({
        consumer_key:         process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
        access_token:         process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
        timeout_ms:           60 * 1000,  // optional HTTP request timeout to apply to all requests.
    });
} else {
    console.log('No Twitter')
}
/* eslint-enable */

// DB config
let db = null
if (process.env.MONGODB_URI) {
    console.log('Configuring MongoDB...')
    mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
} else {
    console.log('No MongoDB')
}

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

// Serve the static content

app.use(express.static(path.join(__dirname, 'build')));

// Serve the APIs

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

////////////////////////////////////////////////////////
              //TWEET WITH MEDIA//
////////////////////////////////////////////////////////

// app.post('/api/tweet', (req, res) => {
//   console.log({ origin: req.headers, body: req.body });
//
//   // create jimp image
//   const jimpData = req.body.jimpData;
//   const tweetKey = jimpData.tweetKey;
//   const scorer = jimpData.scorer;
//   const min = jimpData.min;
//   const teamBFC = jimpData.teamBFC;
//   const teamOPP = jimpData.teamOPP;
//   const oppScore = jimpData.oppScore;
//   const beyondScore = jimpData.beyondScore;
//
//
//   const jimpText = {
//     playerScored: {
//       headline: "Goal for Beyond!!!",
//       subHeadline: scorer,
//       text: `${min} minute`,
//       templateImage: "./public/BFCLive_score_template.png"
//     },
//     gameStarted: {
//       headline: "Game on!",
//       subHeadline: `${teamBFC} vs`,
//       text: `${teamOPP}`,
//       templateImage: "./public/BFCLive_events_template.png"
//     },
//     halfTime: {
//       headline: `${beyondScore} : ${oppScore} at halftime`,
//       subHeadline: ``,
//       text: ``,
//       templateImage: "./public/BFCLive_events_template.png"
//     },
//     secondHalf: {
//       headline: `Second half is underway`,
//       subHeadline: `${teamBFC} ${beyondScore}`,
//       text: `${teamOPP} ${oppScore}`,
//       templateImage: "./public/BFCLive_events_template.png"
//     },
//     finalScore: {
//       headline: "Game ended",
//       subHeadline: `${teamBFC} ${beyondScore}`,
//       text: `${teamOPP} ${oppScore}`,
//       templateImage: "./public/BFCLive_events_template.png"
//     }
//   };
//
//   const headline = jimpText[tweetKey].headline;
//   const subHeadline = jimpText[tweetKey].subHeadline;
//   const text = jimpText[tweetKey].text;
//
//   var date = new Date();
//   var timestamp = date.getTime();
//
//   const templateImage = jimpText[tweetKey].templateImage;
//   const savedImagePath = `./public/jimps/BFCLive_${timestamp}.jpg`;
//
//
//
//   Jimp.read(templateImage, function (err, img) {
//       if (err) throw err;
//       Jimp.loadFont( Jimp.FONT_SANS_32_WHITE ).then(function (font) { // load font from .fnt file
//       img.print(font, 20, 20, headline)
//       img.print(font, 20, 100, subHeadline)
//       img.print(font, 20, 140, text)
//       img.scaleToFit( 400, 300)
//             .write(savedImagePath); // save
//       // image.print(font, x, y, str, width); // print a message on an image with text wrapped at width
//   });
//   });
//
//
//   setTimeout(() => {
//
//     // post a tweet with media
//
//     // var b64content = fs.readFileSync('./public/goal.png', { encoding: 'base64' })
//     // var imagePath = req.body.imagePath
//
//     var b64content = fs.readFileSync(savedImagePath, { encoding: 'base64' })
//
//     // first we must post the media to Twitter
//     twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
//       // now we can assign alt text to the media, for use by screen readers and
//       // other text-based presentations and interpreters
//       var mediaIdStr = data.media_id_string
//       var altText = "BFC game updates"
//       var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
//
//       twitter.post('media/metadata/create', meta_params, function (err, data, response) {
//         if (!err) {
//           // now we can reference the media and post a tweet (media will attach to the tweet)
//
//           const tweet = `${req.body.tweet}`;
//           var params = { status: tweet, media_ids: [mediaIdStr] }
//
//           twitter.post('statuses/update', params, (err, data, response) => {
//             console.log(data)
//             if (err) throw Error(err);
//           });
//         }
//       })
//     })
//
//
//   }, 10000)
//
// });

///////////////////////// END ///////////////////////////////

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

// Serve the App

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server

const timestamp = new Date();
const port = process.env.API_PORT || 3100;
app.listen(port, function() {
    console.log(`[${timestamp}] Server/API running on port ${port}`);
});
