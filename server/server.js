var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
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


var db = {
  pokemon: [
    /*
    {
    id: 0,
    name: 'morty',
    stats: []
    }
    */
  ]
};


/*
function requestPokemonList(){
  request('http://pokeapi.co/api/v2/pokemon/', function(error, response, body) {
    processPokemonList(JSON.parse(body));
  });
}
*/

function requestSpriteUrl(pokemon) {
  console.log(pokemon.sprites);
  spriteUrl = pokemon.sprites[0].resource_uri;
  request('http://pokeapi.co/'+spriteUrl, function(error, response, body) {
    console.log(JSON.parse(body).image);
  });

}

function requestPokemonSingular(url, current, max){
  request(url, function(error, response, body) {

    body = JSON.parse(body);
    db.pokemon.push(body);
    console.log('Pokemon #'+current+' downloaded...');
    console.log('Sprite at :');
    requestSpriteUrl(body);
    if (max == db.pokemon.length) {
      console.log('download complete');
    }
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

function getAllPokemonEasy() {
  var maxPokemon = 5;  // Select number of pokemon to be downloaded
  for (var i = 1; i <= maxPokemon; i++) {
    console.log('Requesting Pokemon #' + i);
    requestPokemonSingular('http://pokeapi.co/api/v1/pokemon/' + i, i, maxPokemon);
  }
}

getAllPokemonEasy();
