var lastTime;
var gameTime = 0;
// var appWidth = canvas.getAttribute('width');
// var appHeight = canvas.getAttribute('height');
var attackButton = {
  x:195,
  y:385,
  width:35,
  height:395
};

var hero = {
  name:'Charlie',
  hp: 2000,
  attack: 100
};

var enemy = {
  name:'bug',
  hp: 1000
};

function battleState(){
  clearCanvas(ctx);
  var upperTextBox = new Image();
  var background = new Image();
  var monster = new Image();
  var heroStats = new Image();
  var battleOptions = new Image();
  var shield = new Image();
  var textbox = new Image();
  upperTextBox.src = 'images/battleScene/upperTextBox.png';
  heroStats.src = 'images/battleScene/heroStatus.png';
  monster.src = 'images/monster0.png';
  background.src = 'images/battleScene/bg.png';
  battleOptions.src = 'images/battleScene/battleOptions.png';
  shield.src = 'images/shield.png';

  background.onload = function(){
    ctx.drawImage(background,0,0);
  };
  monster.onload = function(){
    ctx.drawImage(monster,282,140);
  };
  heroStats.onload = function(){
    ctx.drawImage(heroStats,5,375);
  };
  battleOptions.onload = function(){
    ctx.drawImage(battleOptions, 230, 375);
  };
  // shield.onload = function(){
  //   ctx.drawImage(shield, 165, 375);
  // };

  canvas.addEventListener('mousemove', checkPosBattle);

  function checkPosBattle(mouseEvent){
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
    canvas.addEventListener('mouseup', checkClickBattle);
    return dmg;
  };

  canvas.addEventListener('mouseup', checkClickBattle);

  function checkClickBattle(dmg){
    if(mouseX > attackButton.x && mouseX < attackButton.x + attackButton.width){
      if(mouseY > attackButton.y && mouseY < attackButton.y + attackButton.height){
        dmg = heroAttack();
        console.log('you did ' + dmg + ' dmg!');
        console.log('you clicked attack!');
        canvas.removeEventListener('mouseup', checkClickBattle);
        monsterAttack();
        if(enemy.hp <=0) {
          console.log('You Win!');
          canvas.removeEventListener('mouseup',checkClick);
        }
        else if(hero.hp <=0) {
          console.log('Game Over');
          canvas.removeEventListener('mouseup',checkClick);
        }
      }
    }
  };

  function battleScene(){
    clearCanvas(ctx);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,appWidth, appHeight);
    setTimeout(function(){
      ctx.drawImage(background,0,0);
      ctx.drawImage(monster,282,140);
      ctx.drawImage(heroStats,5,375);
      ctx.drawImage(battleOptions, 215, 375);
      ctx.drawImage(shield, 165, 375);
      //text stuff for heroStatus
      ctx.font = '14px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('Hero Name',10,390);
      ctx.fillText('HP:',10,420);
      //text stuff for battleOptions
      ctx.fillText('Attack', 200, 395);
      showTextBox();
      console.log('transition complete!'); }, 10);


  }

  battleScene();
};
