require('dotenv').config()
const keys = require('./keys')
const Twitter = require('twitter')
const Spotify = require('node-spotify-api')
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const command = process.argv[2]
const param = process.argv.slice(3).join(' ')

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
  case 'do-what-it-says':
    randomCommand()
    break;
  default:
    console.log('Your command is not recognized')
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
  spotify
  .search({ type: 'track', query: song, limit: 1})
  .then(function(response) {
    console.log('Song: ', response.tracks.items[0].name);
    console.log('Album: ', response.tracks.items[0].album.name);
    console.log('Artist: ', response.tracks.items[0].artists[0].name);
    console.log('Link: ', response.tracks.items[0].external_urls.spotify);
    // response.tracks.items.forEach(song => {
    //   console.log(song)
    // })
  })
  .catch(function(err) {
    console.log(err);
  });
}
