'use strict'

// import dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Jimp = require ('jimp');
const moment = require('moment');
const mergeImages = require('merge-images');
const Canvas = require('canvas');

// import twitter dependencies
// const Twit = require('twit');
const Twitter = require('twitter');
const fs = require('fs');

// const Team = require('./model/teams');
const dotenv = require('dotenv');
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
    twitter = new Twitter({
        consumer_key:         process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
        access_token:         process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
        // timeout_ms:           60 * 1000,  // optional HTTP request timeout to apply to all requests.
    });
} else {
    console.log('No Twitter')
}
/* eslint-enable */

////////////////////////////////////////////////////////
                  //DATABASE//
////////////////////////////////////////////////////////
// DB config
// let db = null
// if (process.env.MONGODB_URI) {
//     console.log('Configuring MongoDB...')
//     mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
//     db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// } else {
//     console.log('No MongoDB')
// }

////////////////////////////////////////////////////////
                  //END DATABASE//
////////////////////////////////////////////////////////

// Serve the static content

app.use(express.static(path.join(__dirname, 'build')));

// Serve the APIs

// app.post('/api/tweet', (req, res) => {
//     const tweet = req.body.tweet;
//     twitter.post('statuses/update', { status: tweet }, (error, data, response) => {
//         if (error) {
//             console.log(`[Twitter] ${error.message}`)
//             res.status(200).json({ tweet, error });
//         } else {
//             res.status(200).json({ tweet });
//         }
//     });
// });

////////////////////////////////////////////////////////
              //TWEET WITH MEDIA//
////////////////////////////////////////////////////////

app.post('/api/tweet', (req, res) => {
  // console.log({ origin: req.headers, body: req.body });


  // use cases affect selection of media templates for tweets
  // as well as flow of posts (w/ or w/o media)
  // (1) club: branded templates (BFCNY)
  // (2) league: branded templates (CSL)
  // (3) tbd

  // const useCase = "club"

  // create jimp image
  const jimpData = req.body.jimpData;
  const tweetKey = jimpData.tweetKey;
  const scorer = jimpData.scorer;
  const min = jimpData.min;
  const teamBFC = jimpData.teamBFC;
  const teamOPP = jimpData.teamOPP;
  const oppScore = jimpData.oppScore;
  const beyondScore = jimpData.beyondScore;
  var oppLogo = "";
  var teamID = "";

  if (teamOPP[0] !== "Opponent") {
    teamID = jimpData.bfcDetails[0].id;
    oppLogo = jimpData.oppDetails[0].logo;
  } else {
    teamID = "00000";
    oppLogo = "./public/00000/logo_placeholder.png";
  }

  console.log(teamOPP, "teamID:", teamID);

  const playerScoredTemplate = `./public/${teamID}/templates/playerScored_template.png`;
  const gameStartedTemplate = `./public/${teamID}/templates/gameStarted_template.png`;
  const halfTimeTemplate = `./public/${teamID}/templates/halfTime_template.png`;
  const secondHalfTemplate = `./public/${teamID}/templates/secondHalf_template.png`;
  const finalScoreTemplate = `./public/${teamID}/templates/finalScore_template.png`;

  ////////////MEDIA === JIMP////////////////////////


  const jimpText = {
    playerScored: {
      headline: "",
      subHeadline: scorer,
      text: `${min} minute`,
      templateImage: playerScoredTemplate
    },
    gameStarted: {
      headline: "",
      subHeadline: "",
      text: "",
      templateImage: gameStartedTemplate
    },
    // gameStarted: {
    //   headline: "Game on!",
    //   subHeadline: `${teamBFC} vs`,
    //   text: `${teamOPP}`,
    //   templateImage: gameStartedTemplate
    // },
    halfTime: {
      headline: "",
      subHeadline: `${beyondScore} : ${oppScore} at halftime`,
      text: ``,
      templateImage: halfTimeTemplate
    },
    secondHalf: {
      headline: "",
      subHeadline: "",
      text: "",
      templateImage: secondHalfTemplate
    },
    // secondHalf: {
    //   headline: "Second half is underway",
    //   subHeadline: `${teamBFC} ${beyondScore}`,
    //   text: `${teamOPP} ${oppScore}`,
    //   templateImage: secondHalfTemplate
    // },
    finalScore: {
      headline: "Game ended",
      subHeadline: `${teamBFC} ${beyondScore}`,
      text: `${teamOPP} ${oppScore}`,
      templateImage: finalScoreTemplate
    }
  };

  const headline = 'headline'
  const subHeadline = 'subHeadline'
  const text = 'text'
  // const headline = jimpText[tweetKey].headline;
  // const subHeadline = jimpText[tweetKey].subHeadline;
  // const text = jimpText[tweetKey].text;
  const tweet = req.body.tweet;

  var date = new Date();
  var timestamp = date.getTime();
  //
  const templateImageFile = jimpText[tweetKey].templateImage;
  const targetImageFile = `./public/jimps/BFCLive_${timestamp}.jpg`;

  const addonImageFile = './public/goal.png';

  const templateImagePromise = Jimp.read(templateImageFile)
  const addonImagePromise = Jimp.read(addonImageFile)
  const fontLoadPromise = Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)

  const tweetImage = (image) => {
      twitter.post('media/upload', { media: image })
          .then(media => {
              console.log('Image upload successful!')
              const statusParams = { status: tweet, media_ids: media.media_id_string }
              twitter.post('statuses/update', statusParams)
                  .then(result => {
                      console.log('Twitter update successful!')
                  })
                  .catch(err => {
                      console.log('Failed to update Twitter status!')
                      console.log(err)
                      console.log(err.stack)
                      throw err
                  })
          })
          .catch(err => {
              console.log('Failed to upload image!')
              console.log(err)
              console.log(err.stack)
              throw err
          })
  }

  const encodeJimpImage = (image, mime) => {
      return new Promise((fulfil, reject) => {
          image.getBuffer(mime, (err, data) => {
              if (err) {
                  reject(err)
              } else {
                  fulfil(data)
              }
          })
      })
  }

  const createImage = () => {
      return Promise.all([
          templateImagePromise,
          addonImagePromise,
          fontLoadPromise
      ])
          .then(results => {
              const baseImage = results[0]
              const addonImage = results[1]
              const font = results[2]

              return baseImage
                  .clone()
                  .print(font, 20, 20, headline)
                  .print(font, 55, 150, subHeadline)
                  .print(font, 55, 210, text)
                  .composite(addonImage, 150, 80)
                  .write(targetImageFile) // optional
          })
          .then(createdImage => encodeJimpImage(createdImage, Jimp.MIME_PNG))
  }

  createImage()
      .then(image => tweetImage(image))
      .catch(err => {
          console.log('Failed to create image!')
          console.log(err)
          console.log(err.stack)
          throw err
      })


//   //
//   Jimp.read(templateImage, function (err, img) {
//       if (err) throw err;
//       Jimp.loadFont( Jimp.FONT_SANS_64_WHITE ).then(function (font) { // load font from .fnt file
//       img.print(font, 20, 20, headline)
//       img.print(font, 55, 150, subHeadline)
//       img.print(font, 55, 210, text)
//       // img.scaleToFit( 400, 300)
//             .write(savedImagePath); // save
//       // image.print(font, x, y, str, width); // print a message on an image with text wrapped at width
//   })
//   })
//   // .then(savedImagePath => {
//
//   setTimeout(() => {
//     var base64Image = fs.readFileSync(savedImagePath, { encoding: 'base64' })
//     // const base64Image = base64String.split(';base64,').pop();
//     console.log(base64Image);
//     // first we must post the media to Twitter
//     twitter.post('media/upload', { media_data: base64Image }, function (err, data, response) {
//       if (err) {
//         console.log(err);
//       } else {
//         // now we can assign alt text to the media, for use by screen readers and
//         // other text-based presentations and interpreters
//         var mediaIdStr = data.media_id_string
//         var altText = "Updates via HelloFC app"
//         var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
//
//         twitter.post('media/metadata/create', meta_params, function (err, data, response) {
//           if (err) {
//               console.log(err);
//           } else {
//             // now we can reference the media and post a tweet (media will attach to the tweet)
//             const tweet = req.body.tweet;
//             var params = { status: tweet, media_ids: [mediaIdStr] }
//             twitter.post('statuses/update', params, (err, data, response) => {
//               console.log(data)
//               if (err) console.log(err);
//             });
//           }
//         })
//       }
//     })
//   }, 3000)
});
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  //   ////////////MEDIA === MERGE IMAGES////////////////////////
  //
  // // Merge images
  // mergeImages([
  //   { src: './public/BFCLive_events_template.png', x: 0, y: 0 },
  //   { src: './public/field.png', x: 150, y: 80 },
  //   { src: './public/goal.png', x: 350, y: 60 }
  // ], {
  //   Canvas: Canvas
  // })


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
