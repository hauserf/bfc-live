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
        access_token_key:     process.env.TWITTER_ACCESS_TOKEN,
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
  var bfcLogo = jimpData.bfcDetails[0].logo;

  if (teamOPP[0] !== "Opponent") {
    teamID = jimpData.bfcDetails[0].id;
    oppLogo = jimpData.oppDetails[0].logo;
  } else {
    teamID = "00000";
    oppLogo = "./public/00000/logo_placeholder.png";
  }

  console.log("bfc details: ", jimpData.bfcDetails);


  const playerScoredTemplate = `./public/${teamID}/templates/playerScored_template.png`;
  const gameStartedTemplate = `./public/${teamID}/templates/gameStarted_template.png`;
  const halfTimeTemplate = `./public/${teamID}/templates/halfTime_template.png`;
  const secondHalfTemplate = `./public/${teamID}/templates/secondHalf_template.png`;
  const finalScoreTemplate = `./public/${teamID}/templates/finalScore_template.png`;

  ////////////MEDIA === JIMP////////////////////////

  const tweet = req.body.tweet;
  const eventTypes = [ "gameStarted", "halfTime", "secondHalf", "finalScore" ]

  if (eventTypes.indexOf(tweetKey) === -1) {
    twitter.post('statuses/update', {status: tweet})
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
            console.log(err.stack)
            throw err
        })
} else {

  const jimpText = {
    gameStarted: {
      myTeam: {
        teamName: {
          name: ``,
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 60,
            y: 20
          }
        },
        logo: {
          file: `${bfcLogo}`,
          coord: {
            x: 60,
            y: 220
          }
        }
      },
      opposition: {
        teamName: {
          name: ``,
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 60,
            y: 80
          }
        },
        logo: {
          file: `${oppLogo}`,
          coord: {
            x: 220,
            y: 220
          }
        }
      },
      scoreline: {
        myTeamScore: {
          score: ``,
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 800,
            y: 20
          }
        },
        oppositionScore: {
          score: ``,
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 800,
            y: 80
          }
        }
      },
      templateImage: gameStartedTemplate
    },
    // gameStarted: {
    //   headline: "Game on!",
    //   subHeadline: `${teamBFC} vs`,
    //   text: `${teamOPP}`,
    //   templateImage: gameStartedTemplate
    // },
    halfTime: {
      myTeam: {
        teamName: {
          name: `${teamBFC}`,
          font: `${Jimp.FONT_SANS_64_BLACK}`,
          coord: {
            x: 60,
            y: 120
          }
        },
        logo: {
          file: "./public/empty.png",
          coord: {
            x: 60,
            y: 220
          }
        }
      },
      opposition: {
        teamName: {
          name: `${teamOPP}`,
          font: `${Jimp.FONT_SANS_64_BLACK}`,
          coord: {
            x: 60,
            y: 180
          }
        },
        logo: {
          file: "./public/empty.png",
          coord: {
            x: 220,
            y: 220
          }
        }
      },
      scoreline: {
        myTeamScore: {
          score: `${beyondScore}`,
          font: `${Jimp.FONT_SANS_64_BLACK}`,
          coord: {
            x: 800,
            y: 120
          }
        },
        oppositionScore: {
          score: `${oppScore}`,
          font: `${Jimp.FONT_SANS_64_BLACK}`,
          coord: {
            x: 800,
            y: 180
          }
        }
      },
      templateImage: halfTimeTemplate
    },
    secondHalf: {
      myTeam: {
        teamName: {
          name: "",
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 60,
            y: 20
          }
        },
        logo: {
          file: "./public/empty.png",
          coord: {
            x: 60,
            y: 250
          }
        }
      },
      opposition: {
        teamName: {
          name: "",
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 60,
            y: 80
          }
        },
        logo: {
          file: "./public/empty.png",
          coord: {
            x: 100,
            y: 250
          }
        }
      },
      scoreline: {
        myTeamScore: {
          score: "",
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 800,
            y: 20
          }
        },
        oppositionScore: {
          score: "",
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 800,
            y: 80
          }
        }
      },
      templateImage: secondHalfTemplate
    },
    // secondHalf: {
    //   headline: "Second half is underway",
    //   subHeadline: `${teamBFC} ${beyondScore}`,
    //   text: `${teamOPP} ${oppScore}`,
    //   templateImage: secondHalfTemplate
    // },
    finalScore: {
      myTeam: {
        teamName: {
          name: `${teamBFC}`,
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 60,
            y: 140
          }
        },
        logo: {
          file: `${bfcLogo}`,
          coord: {
            x: 60,
            y: 270
          }
        }
      },
      opposition: {
        teamName: {
          name: `${teamOPP}`,
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 60,
            y: 200
          }
        },
        logo: {
          file: `${oppLogo}`,
          coord: {
            x: 100,
            y: 270
          }
        }
      },
      scoreline: {
        myTeamScore: {
          score: `${beyondScore}`,
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 800,
            y: 140
          }
        },
        oppositionScore: {
          score: `${oppScore}`,
          font: `${Jimp.FONT_SANS_64_WHITE}`,
          coord: {
            x: 800,
            y: 200
          }
        }
      },
      templateImage: finalScoreTemplate
    },
    playerScored: {
      headline: "",
      subHeadline: scorer,
      text: `${min} minute`,
      templateImage: playerScoredTemplate
    }
  };

  const myTeamName = jimpText[tweetKey].myTeam.teamName.name;
  const myTeamFont = jimpText[tweetKey].myTeam.teamName.font;
  const myTeamNameX = jimpText[tweetKey].myTeam.teamName.coord.x;
  const myTeamNameY = jimpText[tweetKey].myTeam.teamName.coord.y;
  const myLogoFile = jimpText[tweetKey].myTeam.logo.file;
  const myLogoX = jimpText[tweetKey].myTeam.logo.coord.x;
  const myLogoY = jimpText[tweetKey].myTeam.logo.coord.y;
  const myScore = jimpText[tweetKey].scoreline.myTeamScore.score;
  const myScoreFont = jimpText[tweetKey].scoreline.myTeamScore.font;
  const myScoreX = jimpText[tweetKey].scoreline.myTeamScore.coord.x;
  const myScoreY = jimpText[tweetKey].scoreline.myTeamScore.coord.y;

  const oppTeamName = jimpText[tweetKey].opposition.teamName.name;
  const oppTeamFont = jimpText[tweetKey].opposition.teamName.font;
  const oppTeamNameX = jimpText[tweetKey].opposition.teamName.coord.x;
  const oppTeamNameY = jimpText[tweetKey].opposition.teamName.coord.y;
  const oppLogoFile = jimpText[tweetKey].opposition.logo.file;
  const oppLogoX = jimpText[tweetKey].opposition.logo.coord.x;
  const oppLogoY = jimpText[tweetKey].opposition.logo.coord.y;
  const oppositionScore = jimpText[tweetKey].scoreline.oppositionScore.score;
  const oppositionScoreFont = jimpText[tweetKey].scoreline.oppositionScore.font;
  const oppositionScoreX = jimpText[tweetKey].scoreline.oppositionScore.coord.x;
  const oppositionScoreY = jimpText[tweetKey].scoreline.oppositionScore.coord.y;

  var date = new Date();
  var timestamp = date.getTime();
  //
  const templateImageFile = jimpText[tweetKey].templateImage;
  const targetImageFile = `./public/jimps/BFCLive_${timestamp}.jpg`;

  const templateImagePromise = Jimp.read(templateImageFile);
  const myLogoFilePromise = Jimp.read(myLogoFile);
  const oppLogoFilePromise = Jimp.read(oppLogoFile);
  // const fontLoadPromise = Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const myTeamFontPromise = Jimp.loadFont(myTeamFont);
  const oppTeamFontPromise = Jimp.loadFont(oppTeamFont);
  const myScoreFontPromise = Jimp.loadFont(myScoreFont);
  const oppositionScoreFontPromise = Jimp.loadFont(oppositionScoreFont);

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

  // include another if statement for "playerScored" ???

  const createImage = () => {
      return Promise.all([
          templateImagePromise,
          myLogoFilePromise,
          oppLogoFilePromise,
          myTeamFontPromise,
          oppTeamFontPromise,
          myScoreFontPromise,
          oppositionScoreFontPromise
      ])
          .then(results => {
              const baseImage = results[0]
              const myLogo = results[1]
              const oppLogo = results[2]
              const fontMyTeam = results[3]
              const fontOppTeam = results[4]
              const fontMyScore = results[5]
              const fontOppScore = results[6]

              return baseImage
                  .clone()
                  .print(fontMyTeam, myTeamNameX, myTeamNameY, myTeamName)
                  .print(fontOppTeam, oppTeamNameX, oppTeamNameY, oppTeamName)
                  .print(fontMyScore, myScoreX, myScoreY, myScore)
                  .print(fontOppScore, oppositionScoreX, oppositionScoreY, oppositionScore)
                  .composite(myLogo, myLogoX, myLogoY)
                  .composite(oppLogo, oppLogoX, oppLogoY)
                  .write(targetImageFile) // optional
          })
          .then(createdImage => encodeJimpImage(createdImage, Jimp.MIME_PNG))
  }

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

  createImage()
      .then(image => tweetImage(image))
      .catch(err => {
          console.log('Failed to create image!')
          console.log(err)
          console.log(err.stack)
          throw err
      })

    }

});

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
