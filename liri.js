require('dotenv').config()
const keys = require('./keys')
const fs = require('fs')
const Twitter = require('twitter')
const Spotify = require('node-spotify-api')
const axios = require('axios')
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const command = process.argv[2]
const param = process.argv.slice(3).join(' ')

decipherCommand(command, param)

// Decipher command
function decipherCommand(command, param){
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
    case 'do-what-it-says':
    randomCommand()
    break;
    default:
    console.log('Your command is not recognized')
  }
}


// Get tweets
function getTweets(){
  client.get('search/tweets', {q: 'okputadora'}, function(error, tweets, response) {
    console.log('most recent tweets from ', tweets.statuses[0].user.screen_name)
    tweets.statuses.forEach(tweet => {
     console.log('text: ', tweet.text)
     console.log('created: ',tweet.created_at)
    })
  });
}

// Get song info
function getSongInfo(song){
  if (song == ''){
    song = 'The Sign'
  }
  spotify
  .search({ type: 'track', query: song, limit: 1})
  .then(response => {
    console.log('Song: ', response.tracks.items[0].name);
    console.log('Album: ', response.tracks.items[0].album.name);
    console.log('Artist: ', response.tracks.items[0].artists[0].name);
    console.log('Link: ', response.tracks.items[0].external_urls.spotify);
  })
  .catch(function(err) {
    console.log("I didn't recognize that song. Check your spelling and try again.");
  });
}

// get movie info
function getMovieInfo(movie){
  if (movie == ''){
    console.log("undefined!")
    movie = 'Mr. Nobody';
  }
  axios.get('http://www.omdbapi.com/?apikey='+ process.env.OMDB_KEY +
            '&t=' + movie)
  .then(response => {
    console.log("title: ",response.data.Title)
    console.log("Year: ",response.data.Year)
    console.log("IMDB Rating: ",response.data.imdbRating)
    console.log("Rotten Tomatoes Rating: ",response.data.Ratings[1].Value)
    console.log("Country: ",response.data.Country)
    console.log("Language: ",response.data.Language)
    console.log("Plot: ",response.data.Plot)
    console.log("Cast: ",response.data.Actors)
  })
  .catch(err => {
    console.log(err)
  })
}

function randomCommand(){
  fs.readFile('random.txt', 'utf8', (err, data) =>{
    if (err){
      console.log(err);
      return;
    }
    commandArr = data.split(",")
    decipherCommand(commandArr[0], commandArr[1])
  })
}
