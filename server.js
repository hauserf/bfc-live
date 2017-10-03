'use strict'

// import dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Jimp = require ('jimp');
const moment = require('moment');

// import twitter dependencies
const dotenv = require('dotenv');
const Twit = require('twit');
const fs = require('fs');

const Team = require('./model/teams');

dotenv.config();

// Create Express server

const app = express();

// prevent errors from Cross Origin Resource Sharing, set headers to allow CORS with middleware
app.use(cors())
// configure API to use bodyParser and look for Json data in the request body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

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

// Serve the static content

app.use(express.static(path.join(__dirname, 'build')));

// Serve the APIs

app.post('/api/tweet', (req, res) => {
    const tweet = req.body.tweet;
    twitter.post('statuses/update', { status: tweet }, (error, data, response) => {
        if (error) {
            console.log(`[Twitter] ${error.message}`)
            res.status(200).json({ tweet, error });
        } else {
            res.status(200).json({ tweet });
        }
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

// Serve the App

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server

const timestamp = moment().format('YYYY-MM-DD hh:mm:ss');
const port = process.env.PORT || 3100;
app.listen(port, function() {
    console.log(`[${timestamp}] Server/API running on port ${port}`);
});
