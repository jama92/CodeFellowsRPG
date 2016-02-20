var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var fs = require('fs');
var serveStatic = require('serve-static');

var app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});

// serves access to sprites in /media
app.use(serveStatic('media'));

// download function sourced from http://stackoverflow.com/questions/12740659/downloading-images-with-node-js
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('Download content-type:', res.headers['content-type']);
    console.log('Download content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
/*--------- Download() example
download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  console.log('done');
});
*/

var db = {
  Pokemon: [

  ],
};

var spriteCounter = 0;

function Pokemon(body) {
  this.name = body.name;
  this.pkdx_id = body.pkdx_id;
  this.attack = (body.attack + body.sp_atk)/2;
  this.defense = (body.defense + body.sp_def)/2;
  this.speed = body.speed;
  this.hp = body.hp;
  this.types = body.types;
  this.sprite = 'localhost:3000/' + body.pkdx_id + '.png';
  this.powerLevel = (this.attack + this.defense + this.hp)/3;
}

/*
function requestPokemonList(){
  request('http://pokeapi.co/api/v2/pokemon/', function(error, response, body) {
    processPokemonList(JSON.parse(body));
  });
}
*/

// Takes pokemon object as input, scrapes resource location for sprite, then downloads it
function requestSpriteUrl(pokemon, max) {
  var pokeId = pokemon.pkdx_id;
  var spriteUrl = pokemon.sprites[0].resource_uri;
  request('http://pokeapi.co/'+spriteUrl, function(error, response, body) {
    var spriteUrl = 'http://pokeapi.co' + JSON.parse(body).image;
    console.log('Requesting sprite for Pokemon #' + pokeId);
    download(spriteUrl, 'media/' + pokeId + '.png', function() {
      console.log('Sprite downloaded for pokemon #' + pokeId);
      spriteCounter += 1;
      if (max == spriteCounter) {
        console.log('Pokemon data download complete');
        console.log(db.pokemon);
        startListening();
      }
    });
  });

}

// Takes pokemon resource url and poke id as input and GETs a pokemon object and adds it to the local db object.
// Also takes total number of pokemon requested as input so that it knows whether a response is the last one
// As pokeapi doesn't respond in order of requests. Starts up server after last request
// DONE: change server to start up after all sprites are downloaded instead
function requestPokemonSingular(url, current, max){
  request(url, function(error, response, body) {
    body = JSON.parse(body);
    db.pokemon.push(new Pokemon(body));
    console.log('Pokemon #'+current+' downloaded...');
    requestSpriteUrl(body, max);
  });
}

/*
function processPokemonList(pokeList) {
  var counter = 0;
  while (counter <= 4){
    pokeList.forEach(function(pokemon) {
      counter += 1;
      console.log(counter);
      requestPokemonSingular(pokemon.url);
    });
  }
}*/

// Initiates pokemon info request upon
function getAllPokemonEasy() {
  var startingId = 1;  // Select starting poke ID
  var maxPokemon = 15;  // Select number of pokemon to be downloaded
  for (var i = startingId; i <= maxPokemon; i++) {
    console.log('Requesting Pokemon #' + i);
    requestPokemonSingular('http://pokeapi.co/api/v1/pokemon/' + i, i, maxPokemon);
  }
}

// Starts listening at port 3000
function startListening() {
  console.log('Starting up server');
  app.listen(3000, function(){
    console.log('Listening at port 3000');
  });
}


getAllPokemonEasy();
