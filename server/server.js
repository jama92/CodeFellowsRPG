var config = require('./config');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var fs = require('fs');
var serveStatic = require('serve-static');
// initialize database, sourced from http://blog.modulus.io/nodejs-and-sqlite
var file = './database.db';
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

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

// Keeps track of downloaded sprites
var spriteCounter = 0;

// Pokemon object constructor
function Pokemon(body) {
  this.name = body.name;
  this.pkdx_id = parseInt(body.pkdx_id);
  this.attack = Math.round((body.attack + body.sp_atk)/2);
  this.defense = Math.round((body.defense + body.sp_def)/2);
  this.speed = parseInt(body.speed);
  this.hp = parseInt(body.hp);
  this.types = body.types;
  this.sprite = 'http://localhost:3000/sprites/' + body.pkdx_id + '.png';
  this.powerLevel = Math.round(((body.attack + body.sp_atk)/2 + (body.defense + body.sp_def)/2 + this.hp)/3);
}



// download function sourced from http://stackoverflow.com/questions/12740659/downloading-images-with-node-js
function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('Download content-type:', res.headers['content-type']);
    console.log('Download content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
}

function makeTables() {
  db.serialize(function() {
    console.log('Creating new Pokemon table');
    db.run('drop table if exists Pokemon');
    db.run('CREATE TABLE Pokemon (name TEXT, pkdx_id INT, attack INT, defense INT, hp INT, sprite TEXT, powerLevel INT)');
    console.log('Creating new Types table');
    db.run('drop table if exists Types');
    db.run('CREATE TABLE Types (pkdx_id INT, type TEXT)');
  });
}


// Takes pokemon object and inserts into database
function insertPokemon(p) {
  db.serialize(function() {
    console.log('Inserting Pokemon #' + p.pkdx_id + ' into database');
    db.run('INSERT INTO Pokemon(name, pkdx_id, attack, defense, hp, sprite, powerLevel) VALUES(' +
           '"'+p.name+'", '+p.pkdx_id+', '+p.attack+', '+p.defense+', '+p.hp+', "'+p.sprite+'", '+p.powerLevel+')');
    insertTypes(p);
  });
}

// Takes pokemon object and inserts its types into database
function insertTypes(p) {
  p.types.forEach(function(ele){
    db.run('INSERT INTO Types(pkdx_id, type)' +
           'VALUES('+p.pkdx_id+', "'+ele.name+'")');
  });
}

// Selects and console logs tables, for bugtesting
function printTables() {
  db.serialize(function(){
    db.all('SELECT * FROM Pokemon', function(error, rows) {
      console.log(rows);
    });

    db.all('SELECT * FROM Types', function(error, rows) {
      console.log(rows);
    });

    db.all('SELECT * FROM Pokemon [INNER] JOIN Types USING (pkdx_id)', function(error, rows) {
      console.log(rows);
    });
  });
}

// Takes pokemon object as input, scrapes resource location for sprite, then downloads it
function requestSpriteUrl(pokemon, max) {
  var pokeId = pokemon.pkdx_id;
  var spriteUrl = pokemon.sprites[0].resource_uri;
  request('http://pokeapi.co/'+spriteUrl, function(error, response, body) {
    var spriteUrl = 'http://pokeapi.co' + JSON.parse(body).image;
    console.log('Requesting sprite for Pokemon #' + pokeId);
    download(spriteUrl, './media/sprites/' + pokeId + '.png', function() {
      spriteCounter += 1;
      if (max == spriteCounter) {
        console.log('Pokemon data download complete');
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
    console.log('Pokemon #'+current+' downloaded...');
    body = JSON.parse(body);
    var pokemon = new Pokemon(body);
    insertPokemon(pokemon);
    requestSpriteUrl(body, max);
  });
}


// Initiates pokemon info request upon
function getAllPokemonEasy() {
  for (var i = config.pokeStart; i < config.pokeStart + config.pokeEnd; i++) {
    console.log('Requesting Pokemon #' + i);
    requestPokemonSingular('http://pokeapi.co/api/v1/pokemon/' + i, i, config.pokeEnd);
  }
}

// Starts listening at port 3000
function startListening() {
  console.log('Starting up server');
  // serves access to sprites in /media
  app.use(serveStatic('media'));
  app.listen(3000, function(){
    console.log('Listening at port 3000');
  });
}

// pokeList and types should be arrays
function getPokemonByType(pokeList, res, types){
  var type = types.pop();

  db.all('SELECT * FROM Pokemon [INNER] JOIN TYPES USING (pkdx_id) WHERE TYPE="'+type+'"', function(error, rows) {
    if (rows.length > 0) {
      for(var i = 0; i < config.queryQty; i++){
        pokeList.push(rows[parseInt(Math.random() * rows.length)]);
      }
      console.log('Added ' + type + ' type Pokemon to list');
    } else {
      console.log('No pokemon of type ' + type);
    }

    if(types.length > 0){
      getPokemonByType(pokeList, res, types);
    } else if(pokeList.length > 0) {
      res.json(pokeList);
    } else {
      console.log('No pokemon were found');
      res.json('Error: No pokemon available');
    }
  });
}

function startUp(){
  makeTables();
  getAllPokemonEasy();
}

app.get('/getRandom', function (req, res) {
  var types = config.randomTypes.slice(0);
  console.log('Request for random Pokemon received');
  getPokemonByType([], res, types);
});

app.get('/getRandom/:type', function (req, res) {
  console.log('Request for ' + req.params.type + ' Pokemon received');
  getPokemonByType([], res, [req.params.type]);
});

startUp();
