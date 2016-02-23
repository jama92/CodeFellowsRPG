function Enemy (hp,attack,type,sprite) {
  this.hp = hp;
  this.attack = attack;
  this.type = type;
  this.sprite = sprite;
}

var randomPokemon=[];
var randomEnemy;
var newEnemy;
Enemy.prototype.newType = function() {
  if(this.type=='fire'){
    this.type = 'html';
  }
  else if(this.type=='water') {
    this.type = 'css';
  }
  else if(this.type=='grass') {
    this.type = 'javascript';
  }
  console.log(this.type);
};
$.get('http://localhost:3000/getRandom', function(data) {
  randomPokemon=data;
  console.log(randomPokemon);
}).then(function () {
  randomEnemy = randomPokemon[Math.floor(Math.random()*randomPokemon.length)];
  console.log(randomEnemy);
}).then(function() {
  newEnemy = new Enemy(randomEnemy.hp,randomEnemy.attack,randomEnemy.type,randomEnemy.sprite);
  console.log(newEnemy);
}).then(function() {
  newEnemy.newType();
  console.log(newEnemy);
});
