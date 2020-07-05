const express = require("express");
const app = express();

const MusicBot = require('./commands/index');

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const musicBot = new MusicBot({
  discordToken: process.env.TOKEN,
  googleKey: process.env.YOUTUBE_TOKEN,
  geniusKey: process.env.GENIUS_TOKEN,
  prefix: undefined,
});

musicBot.start();