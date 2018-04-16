require('dotenv').config()
const keys = require('./keys')
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const command = process.argv[2]
const param = process.argv.slice(3).join(" ")

// Decipher command
switch (command){
  case 'my-tweets':
    getTweets()
    break;
  case 'spotify-this-song':
    getSongInfo(param)
    break;
  case 'movie-this':
    getMovieInfo(param)
    break;
  case 'do-what-it-says'
    randomCommand()
    break;
  default
    console.log("Your command is not recognized")
}


// Get tweets
