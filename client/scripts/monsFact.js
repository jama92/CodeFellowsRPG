function Enemy (hp,attack,type,sprite) {
  this.currentHP = hp;
  this.maxHP = hp;
  this.attack = attack;
  this.type = type;
  this.sprite = sprite;
}

var randomPokemon=[];
var randomEnemy;

function pickRandomEnemy() {
  randomEnemy = randomPokemon[Math.floor(Math.random()*randomPokemon.length)];
  console.log(randomEnemy);
  function () {
    enemy = new Enemy(randomEnemy.hp,randomEnemy.attack,randomEnemy.type,randomEnemy.sprite);
    console.log(enemy);
    function() {
      enemy.newType();
      console.log(enemy);
    }
  }
}
var enemy;
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
}).then(pickRandomEnemy());
