//Initialize canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

//create all global variables
var lastTime;
var gameTime = 0;
var appWidth = canvas.getAttribute('width');
var appHeight = canvas.getAttribute('height');
var mouseX;
var mouseY;
var attackButton = {
  x:195,
  y:385,
  width:35,
  height:395
};

var hero = {
  name:'Charlie',
  hp: 9999
};

var enemy = {
  name:'bug',
  hp: 9999
};

//TODO wrap this in document loader function
var background = new Image();
var monster = new Image();
var heroStats = new Image();
var battleOptions = new Image();
var shield = new Image();
heroStats.src = 'images/heroStatus.png';
monster.src = 'images/monster0.png';
background.src = 'images/bg.png';
battleOptions.src = 'images/battleOptions.png';
shield.src = 'images/shield.png';

ctx.drawImage(background,0,0);
ctx.drawImage(monster,282,140);
ctx.drawImage(heroStats,5,375);
ctx.drawImage(battleOptions, 155, 375);
ctx.drawImage(shield, 165, 375);

//text stuff for heroStatus
ctx.font = '14px Arial';
ctx.fillStyle = 'white';
ctx.fillText('Hero Name',10,390);
ctx.fillText('HP:',10,420);

//text stuff for battleOptions
ctx.fillText('Attack', 200, 395);

canvas.addEventListener('mousemove', checkPos);

function checkPos(mouseEvent){
  mouseX = mouseEvent.pageX - this.offsetLeft;
  mouseY = mouseEvent.pageY - this.offsetTop;
  // console.log(mouseX);
  // console.log(mouseY);
};
function heroAttack(){
  var dmg = Math.floor((Math.random() * 100) + 100);
  enemy.hp -= dmg;
  console.log('new monster hp is ' + enemy.hp);
  console.log(dmg);
  return dmg;
}

function monsterAttack(){
  var dmg = Math.floor((Math.random() * 100) + 100);
  hero.hp -= dmg;
  console.log('monster does ' + dmg);
  console.log('your new hp is ' + hero.hp);
  canvas.addEventListener('mouseup', checkClick);
  return dmg;
};


canvas.addEventListener('mouseup', checkClick);

function checkClick(dmg){
  if(mouseX > attackButton.x && mouseX < attackButton.x + attackButton.width){
    if(mouseY > attackButton.y && mouseY < attackButton.y + attackButton.height){
      dmg = heroAttack();
      console.log('you did ' + dmg + ' dmg!');
      console.log('you clicked attack!');
      canvas.removeEventListener('mouseup', checkClick);
      monsterAttack();

    }
  }
};



//resource prep
resources.load([
  //TODO add sprite sheet paths
    /*'...png',
    '...png',
    '...png'
    */
]);

resources.onReady(initialize);

//main game Loop
function main (){
  //create variables for keeping track of change in time between game updates (delta time)
  var now = Date.now();
  var dt = (now - lastTime)/1000.0;
  update(dt);
  render();
  lastTime = now;
  requestAnimFrame();

};


function initialize(){
  //TODO add initial map state
  lastTime = Date.now;
  main();
};

function update(dt){
  gameTime += dt;
  checkInput(dt);
  updateEntities(dt);
};

function checkInput(dt){
  //TODO add logic for different keydowns or mouse events
};

function updateEntities(dt){
  //TODO add logic to update changes made to sceen or map
};

//draw everything
function render(){
  //TODO add logic to display elements at correct locations
};

function requestAnimFrame(){
  //TODO add logic for animation
}
