var lastTime;
var gameTime = 0;
var leftMarginTextPadding = 5;
var displayBottomBoxHeight = 100;
var displayBottomBoxLeftPadding = 5;
var displayBottomBoxBottomPadding = 5;
var displayBottomBoxesGutterPadding = 5;

// var appWidth = canvas.getAttribute('width');
// var appHeight = canvas.getAttribute('height');
var attackButton = {
  x:195,
  y:385,
  width:35,
  height:395
};

var htmlAttackButton = {
  x:195,
  y:385,
  width:35,
  height:395
};

var cssAttackButton = {
  x:195,
  y:385,
  width:35,
  height:395
};

var jsAttackButton = {
  x:195,
  y:385,
  width:35,
  height:395
};

var hero = {
  name:'Charlie',
  currentHP: 2000,
  maxHP: 2000,
  attack: 100
};

var enemy = {
  name:'bug',
  currentHP: 1000,
  maxHP: 1000
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
  var heroHealthBar = new Image();
  var enemyHealthBar = new Image();
  var heroHealthBarBackground = new Image();
  var enemyHealthBarBackground = new Image();
  var enemyHealthBarWidth = 160;
  var enemyHealthBarHeight = 10;
  var heroHealthBarWidth = 160;
  var heroHealthBarHeight = 10;
  upperTextBox.src = 'images/battleScene/upperTextBox.png';
  heroStats.src = 'images/battleScene/heroStatus.png';
  heroStats.xcoord = (displayBottomBoxLeftPadding);
  heroStats.ycoord = (appHeight - displayBottomBoxHeight - displayBottomBoxBottomPadding);
  console.log(heroStats.xcoord);
  console.log(heroStats.ycoord);
  monster.src = 'images/monster0.png';
  background.src = 'images/battleScene/bg.png';
  battleOptions.src = 'images/battleScene/battleOptions.png';
  shield.src = 'images/shield.png';
  heroHealthBar.src = 'images/battleScene/hpBar.png';
  enemyHealthBar.src = 'images/battleScene/hpBar.png';
  heroHealthBarBackground.src = 'images/battleScene/hpBarBackground.png';
  enemyHealthBarBackground.src = 'images/battleScene/hpBarBackground.png';


  // background.onload = function(){
  //   ctx.drawImage(background,0,0);
  // };
  // monster.onload = function(){
  //   ctx.drawImage(monster,282,140);
  // };
  // heroStats.onload = function(){
  //   ctx.drawImage(heroStats,5,375);
  // };
  // battleOptions.onload = function(){
  //   ctx.drawImage(battleOptions, 230, 375);
  // };
  // shield.onload = function(){
  //   ctx.drawImage(shield, 165, 375);
  // };

//define event listeners for battle scene
  canvas.addEventListener('mousemove', checkPosBattle);
  canvas.addEventListener('mouseup', checkClickBattle);
  //TODO: create quit game listener

  function applyDMG(entity, dmg){
    var spotter = false;
    if(entity == hero){
      hero.currentHP -= dmg;
      spotter = true;
    }
    if(entity == enemy){
      enemy.currentHP -= dmg;
    }
    console.log('Hero: ' + hero.currentHP);
    console.log('Monster: ' + enemy.currentHP);
    var deltaHeroHP = (hero.currentHP/hero.maxHP);
    var deltaEnemyHP = (enemy.currentHP/enemy.maxHP);
    // console.log(deltaHeroHP);
    // console.log(deltaEnemyHP);

//bring back event listener after short delay and animate all
//desired components
    setTimeout(function(){
      console.log('render TiMe!');
      healthBarRender(deltaHeroHP, deltaEnemyHP);
      if(spotter){
        seizureMode();
      }
    }, 1500);
  }

  function healthBarRender(deltaHeroHP, deltaEnemyHP){
    // ctx.clearRect(0,0,appWidth,appHeight);
    ctx.drawImage(heroHealthBarBackground, 35,410);
    ctx.drawImage(heroHealthBar, 35,410, (heroHealthBarWidth * deltaHeroHP), heroHealthBarHeight);
    ctx.drawImage(enemyHealthBarBackground, 425,200);
    ctx.drawImage(enemyHealthBar, 425,200, (enemyHealthBarWidth * deltaEnemyHP), enemyHealthBarHeight);
  }

  function checkPosBattle(mouseEvent){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
    // console.log(mouseX);
    // console.log(mouseY);
  };
  function heroAttack(){
    canvas.removeEventListener('mouseup', checkClickBattle);
    var dmg = Math.floor((Math.random() * 100) + 100);
    console.log('hero swings for ' + dmg);
    applyDMG(enemy, dmg);
  }

  function monsterAttack(){
    var dmg = Math.floor((Math.random() * 100) + 100);
    console.log('monster swings for ' + dmg);
    applyDMG(hero, dmg);
  };

  function checkClickBattle(dmg){
    if(mouseX > attackButton.x && mouseX < attackButton.x + attackButton.width){
      if(mouseY > attackButton.y && mouseY < attackButton.y + attackButton.height){
        console.log('you clicked attack!');
        canvas.removeEventListener('mouseup', checkClickBattle);
        dmg = heroAttack();
        setTimeout(function(){
          // saveCanvas(canvas,ctx);
          // seizureMode();
          monsterAttack();
          canvas.addEventListener('mouseup', checkClickBattle);}, 1500);


        if(enemy.currentHP <=0) {
          console.log('You Win!');
          canvas.removeEventListener('mouseup',checkClickBattle);
        }
        else if(hero.currentHP <=0) {
          console.log('Game Over');
          canvas.removeEventListener('mouseup',checkClickBattle);
        }
      }
    }
  };

  function battleScene(){
    clearCanvas(ctx);
    setTimeout(function(){
      ctx.drawImage(background,0,0);
      ctx.drawImage(monster,282,140);
      ctx.drawImage(heroStats, heroStats.xcoord, heroStats.ycoord);
      ctx.drawImage(battleOptions, 215, 375);
      ctx.drawImage(shield, 165, 375);
      ctx.drawImage(heroHealthBar, 35,410);
      ctx.drawImage(enemyHealthBar, 425,200);
      //text stuff for hero Status
      ctx.font = '14px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('Hero Name', (heroStats.xcoord + leftMarginTextPadding),390);
      ctx.fillText('HP:',10,420);
      //text stuff for battleOptions
      ctx.fillText('Attack', 200, 395);
      //text stuff for monster status
      ctx.fillText(enemy.name, 425, 190);
      //showTextBox();
      console.log('transition complete!'); }, 10);
  }

  function monsterName(){
    enemy.name = JSNames[Math.floor(Math.random()*JSNames.length)];
    console.log(enemy.name);
  }

  monsterName();
  battleScene();
};
