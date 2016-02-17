//credit to Tyler Seitz for his tutorial on animating game menuShield
//much of the following code was adapted from his methodologies

if(!canvas){
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);
  var appWidth = canvas.getAttribute('width');
  var appHeight = canvas.getAttribute('height');
}

var bgImage = new Image();
var titleImage = new Image();
var newGameImage = new Image();
var loadGame = new Image();
var creditsImage = new Image();
var shieldImage = new Image();
bgImage.src = 'images/menuBG.png';
titleImage.src = 'images/menuTitle.png';
newGameImage.src = 'images/newGame.png';
loadGame.src = 'images/loadGame.png';
creditsImage.src = 'images/credits.png';
shieldImage.src = 'images/menuShield.png';

var buttonX = [189,172,203];
var buttonY = [336,378,421];
var buttonWidth = [248,283,219];
var buttonHeight = 29;
var mouseX;
var mouseY;
var shieldX = [0,0];
var shieldY = [0,0];
var shieldWidth = 25;
var shieldHeight = 29;
var shieldVis = false;
var shieldSize = shieldWidth;
var shieldRotate = 0;

bgImage.onload = function(){
  ctx.drawImage(bgImage,0,0);
};
titleImage.onload = function(){
  ctx.drawImage(titleImage, 75, 45);
};
newGameImage.onload = function(){
  ctx.drawImage(newGameImage, buttonX[0], buttonY[0]);
};
loadGame.onload = function(){
  ctx.drawImage(loadGame, buttonX[1], buttonY[1]);
};
creditsImage.onload = function(){
  ctx.drawImage(creditsImage, buttonX[2], buttonY[2]);
};

canvas.addEventListener('mousemove', checkPos);
canvas.addEventListener('mousedown', checkClick);

var frames = 30;
var timerId = 0;

timerId = setInterval(update, 1000/frames);

function update(){
  clearApp();
  move();
  draw();
}

function move(){
  if(shieldSize == shieldWidth){
    shieldRotate = -1;
  }
  if(shieldSize == 0){
    shieldRotate = 1;
  }
  shieldSize += shieldRotate;

}
function draw(){
  ctx.drawImage(bgImage,0,0);
  ctx.drawImage(titleImage, 75, 45);
  ctx.drawImage(newGameImage, buttonX[0], buttonY[0]);
  ctx.drawImage(loadGame, buttonX[1], buttonY[1]);
  ctx.drawImage(creditsImage, buttonX[2], buttonY[2]);
  if(shieldVis === true){
    ctx.drawImage(shieldImage, shieldX[0] - (shieldSize/2), shieldY[0], shieldSize, shieldHeight );
    ctx.drawImage(shieldImage, shieldX[1] - (shieldSize/2), shieldY[1], shieldSize, shieldHeight );
  }
}
function clearApp(){
  ctx.clearRect(0, 0, appWidth, appHeight);
}

function checkPos(mouseEvent){
  mouseX = mouseEvent.pageX - this.offsetLeft;
  mouseY = mouseEvent.pageY - this.offsetTop;

  for (i = 0; i < buttonX.length; i++){
    if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
      if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight){
        console.log('(' + mouseX + ', ' + mouseY + ')');
        shieldVis = true;
        shieldX[0] = buttonX[i] - (shieldWidth);
        shieldY[0] = buttonY[i];
        shieldX[1] = buttonX[i] + buttonWidth[i] + (shieldWidth);
        shieldY[1] = buttonY[i];
      }
    }else{
      shieldVis = false;
    }
  }
};

function checkClick(){
  console.log('x: ' + mouseX);
  console.log('y: ' + mouseY);
  var fadeId = 0;
  for (i=0; i < buttonX.length; i++){
    if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
      if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight){
        fadeId = setInterval('fadeOut()', 1000/frames);
        clearInterval(timerId);
        canvas.removeEventListener('mousemove', checkPos);
        canvas.removeEventListener('mousedown', checkClick);

      };
    };
  };
};

function fadeOut(){
  setTimeout(function(){
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, appWidth, appHeight);
    main(); }, 500);
}
