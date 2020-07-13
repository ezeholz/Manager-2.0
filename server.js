var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/config.json')
var db = low(adapter)

// --------------------------------------------------------------------------------------------

const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.status(200).send('<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSOQTtcKl47U0rGKeZCSRCMH8ET4jJo6ORQkBvu4LUvkmSx8XYfBeUYxyHJM9um5CcJorl7naf4pXoJ/pubchart?oid=1191872193#'+Math.floor(Math.random() * 100)+'"></iframe>')
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
  botAuthor: process.env.AUTHOR,
  twitchClient: process.env.TWITCH_CLIENT_ID,
  twitchToken: process.env.TWITCH_TOKEN,
});

musicBot.start().then(()=>{app.get("/active", (request, response) => {response.sendStatus(204)})})