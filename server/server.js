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
var file = 'database.db';
var exists = fs.existsSync(file);
// download function sourced from http://stackoverflow.com/questions/12740659/downloading-images-with-node-js
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('Download content-type:', res.headers['content-type']);
    console.log('Download content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// initialize database, sourced from http://blog.modulus.io/nodejs-and-sqlite

var file = './database.db';
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  console.log('Creating new Pokemon table');
  db.run('drop table if exists Pokemon');
  db.run('CREATE TABLE Pokemon (name TEXT, pkdx_id INT, attack INT, defense INT, hp INT, sprite TEXT, powerLevel INT)');
  console.log('Creating new Types table');
  db.run('drop table if exists Types');
  db.run('CREATE TABLE Types (pkdx_id INT, type TEXT)');
});


var spriteCounter = 0;

function Pokemon(body) {
  this.name = body.name;
  this.pkdx_id = parseInt(body.pkdx_id);
  this.attack = Math.round((body.attack + body.sp_atk)/2);
  this.defense = Math.round((body.defense + body.sp_def)/2);
  this.speed = parseInt(body.speed);
  this.hp = parseInt(body.hp);
  this.types = body.types;
  this.sprite = 'https://localhost:3000/sprites/' + body.pkdx_id + '.png';
  this.powerLevel = Math.round(((body.attack + body.sp_atk)/2 + (body.defense + body.sp_def)/2 + this.hp)/3);
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
    });data
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
      console.log('Sprite downloaded for pokemon #' + pokeId);
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
  var startingId = 1;  // Select starting poke ID
  var maxPokemon = 30;  // Select number of pokemon to be downloaded
  for (var i = startingId; i < startingId + maxPokemon; i++) {
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

function getFire(res){
  console.log('Getting random fire type pokemon...');
  var pokeList = [];
  db.serialize(function(){
    db.all('SELECT * FROM Pokemon [INNER] JOIN Types USING (pkdx_id) WHERE type="fire"', function(error, rows) {
      console.log(rows);
      for(var i = 0; i < 3; i++){
        pokeList.push(rows[parseInt(Math.random() * rows.length)]);
      }
      getWater(pokeList, res);
    });
  });
}

function getWater(pokeList, res){
  console.log('Getting random water type pokemon...');
  db.serialize(function(){
    db.all('SELECT * FROM Pokemon [INNER] JOIN Types USING (pkdx_id) WHERE type="water"', function(error, rows) {
      console.log(rows);
      for(var i = 0; i < 3; i++){
        pokeList.push(rows[parseInt(Math.random() * rows.length)]);
      }
      getGrass(pokeList, res);
    });
  });
};

function getGrass(pokeList, res){
  console.log('Getting random grass type pokemon...');
  db.serialize(function(){
    db.all('SELECT * FROM Pokemon [INNER] JOIN Types USING (pkdx_id) WHERE type="grass"', function(error, rows) {
      console.log(rows);
      for(var i = 0; i < 3; i++){
        pokeList.push(rows[parseInt(Math.random() * rows.length)]);
      }
      console.log(pokeList);
      res.json(pokeList);
    });
  });
};


app.get('/getRandom', function (req, res) {
  getFire(res);
});


getAllPokemonEasy();
