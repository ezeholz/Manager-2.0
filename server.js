var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/config.json')
var db = low(adapter)

// --------------------------------------------------------------------------------------------

const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200)
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// --------------------------------------------------------------------------------------------

const MusicBot = require('./commands/index');

const musicBot = new MusicBot({
  discordToken: process.env.TOKEN,
  googleKey: process.env.YOUTUBE_TOKEN,
  prefix: process.env.PREFIX,
  database: db,
  botAuthor: process.env.AUTHOR
});

//musicBot.start();