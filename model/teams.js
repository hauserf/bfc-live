'use strict'

// import dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an object that shows
// the shape of your database entries.
var TeamsSchema = new Schema({
  name: String,
  // {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   trim: true
  // },
  manager: String
  // {
  //   type: String,
  //   required: true,
  //   trim: true
  // }
});

//export module to use in server.js
module.exports = mongoose.model('Team', TeamsSchema)
