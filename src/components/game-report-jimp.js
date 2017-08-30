import React, { Component } from 'react';

export default class GameReportJimp extends Component {

  // componentWillMount() {
  //   var Jimp = require ('jimp');
  //   var numberString = "1:1";
  //
  //   Jimp.read("../public/BFC_CSL_Jerseys.png", function (err, img) {
  //       if (err) throw err;
  //       Jimp.loadFont( Jimp.FONT_SANS_64_WHITE ).then(function (font) { // load font from .fnt file
  //       img.print(font, 50, 50, numberString)
  //       img.print(font, 50, 110, "59'")
  //       img.print(font, 50, 170, "Jesse Rose")
  //       img.scaleToFit( 400, 400)
  //             .write("../public/BFC_CSL_Jerseys_new.jpg"); // save
  //       // image.print(font, x, y, str, width); // print a message on an image with text wrapped at width
  //   });
  //   });
  // }

  render() {
    return (
      <div>
        {/* <img src="BFC_CSL_Jerseys_new.jpg" alt="report_img" /> */}
      </div>
    );
  };
}
