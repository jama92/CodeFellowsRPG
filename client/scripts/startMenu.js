var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
// document.body.appendChild(canvas);
$('#mycanvas').append(canvas);
var appWidth = canvas.getAttribute('width');
var appHeight = canvas.getAttribute('height');
//global mouse tracker coords
var mouseX;
var mouseY;

(function(){
  //events for main menu
  canvas.addEventListener('mousemove', checkPos);
  canvas.addEventListener('mousedown', checkClick);
//button sizes and locations
  var buttonX = [189,172,203];
  var buttonY = [336,378,421];
  var buttonWidth = [248,283,219];
  var buttonHeight = 29;
//codefellows logo animation vars
  var shieldX = [0,0];
  var shieldY = [0,0];
  var shieldWidth = 25;
  var shieldHeight = 29;
  var shieldVis = false;
  var shieldSize = shieldWidth;
  var shieldRotate = 0;
//image prep for drawing to menu scene
  var bgImage = new Image();
  var titleImage = new Image();
  var newGameImage = new Image();
  var loadGame = new Image();
  var creditsImage = new Image();
  var shieldImage = new Image();
//add attributes to image objects
  bgImage.src = 'images/menu/menuBG.png';
  bgImage.xcoord = 0;
  bgImage.ycoord = 0;
  titleImage.src = 'images/menu/menuTitle.png';
  titleImage.xcoord = 75;
  titleImage.ycoord = 45;
  newGameImage.src = 'images/menu/newGame.png';
  newGameImage.xcoord = 189;
  newGameImage.ycoord = 336;
  loadGame.src = 'images/menu/loadGame.png';
  loadGame.xcoord = 172;
  loadGame.ycoord = 378;
  creditsImage.src = 'images/menu/credits.png';
  creditsImage.xcoord = 203;
  creditsImage.ycoord = 421;
  shieldImage.src = 'images/menu/menuShield.png';
  //draw images to canvas once they load
  // bgImage.onload = function(){
  //   ctx.drawImage(bgImage, bgImage.xcoord, bgImage.ycoord);
  // };
  // titleImage.onload = function(){
  //   ctx.drawImage(titleImage, titleImage.xcoord, titleImage.ycoord);
  // };
  // newGameImage.onload = function(){
  //   ctx.drawImage(newGameImage, newGameImage.xcoord, newGameImage.ycoord);
  // };
  // loadGame.onload = function(){
  //   ctx.drawImage(loadGame, buttonX[1], buttonY[1]);
  // };
  // creditsImage.onload = function(){
  //   ctx.drawImage(creditsImage, creditsImage.xcoord, creditsImage.ycoord);
  // };

  function draw(){
    ctx.drawImage(bgImage, bgImage.xcoord, bgImage.ycoord);
    ctx.drawImage(titleImage, titleImage.xcoord, titleImage.ycoord);
    ctx.drawImage(newGameImage, newGameImage.xcoord, newGameImage.ycoord);
    ctx.drawImage(loadGame, loadGame.xcoord, loadGame.ycoord);
    ctx.drawImage(creditsImage, creditsImage.xcoord, creditsImage.ycoord);
    if(shieldVis === true){
      ctx.drawImage(shieldImage, shieldX[0] - (shieldSize/2), shieldY[0], shieldSize, shieldHeight);
      ctx.drawImage(shieldImage, shieldX[1] - (shieldSize/2), shieldY[1], shieldSize, shieldHeight);
    }
  }
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
          canvas.removeEventListener('mousemove', checkPos);
          canvas.removeEventListener('mousedown', checkClick);
          clearInterval(timerId);
          fadeOut();
        };
      };
    };
  };
})();

function fadeOut(){
  setTimeout(function(){
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, appWidth, appHeight);
    //DONE call function for button click from menu
    battleState();
    console.log('porting!');}, 500);
}
