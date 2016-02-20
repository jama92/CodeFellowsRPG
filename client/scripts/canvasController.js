var currentCanvas = new Image();

function saveCanvas(whichCanvas, context){
  localStorage.setItem('currentCanvas', whichCanvas.toDataURL());
  currentCanvas.src = localStorage.getItem('currentCanvas');
  console.log(whichCanvas.toDataURL());
  context.save();
};

function loadLastCanvas(context){
  context.clearRect(0,0,appWidth, appHeight);
  context.restore();
  currentCanvas.src = localStorage.getItem('currentCanvas');
  currentCanvas.onload = function(){
    context.drawImage(currentCanvas,0,0);
    console.log(currentCanvas.src);
  };
};

function clearCanvas(contextNumber){
  contextNumber.clearRect(0,0,appWidth,appHeight);
};

//to prepare a scene on hidden canvas
//make sure to prep canvas based in order of layers. background should be
//first argument...topmost layer should be last argument.
function stageCanvas(img1,img2,img3,img4,img5){
  if(img1){
    ctx2.drawImage(img1, img1.xcoord, img1.ycoord);
  }
  if(img2){
    ctx2.drawImage(img2, img2.xcoord, img2.ycoord);
  }
  if(img3){
    ctx2.drawImage(img3, img3.xcoord, img3.ycoord);
  }
  if(img4){
    ctx2.drawImage(img4, img4.xcoord, img4.ycoord);
  }
  if(img5){
    ctx2.drawImage(img5, img5.xcoord, img5.ycoord);
  }
};

function doubleFade(){
  fadeOutCurrentCanvas();
  fadeInCurrentCanvas();
};

function showCanvas(){
  $(canvas).show();
  $(canvas2).show();
}

function loadNewScene(){
  clearCanvas();
}

function passinImgs(){
  stageCanvas(bgImage,titleImage);
}

var fadeIn_alpha = 0;

function fadeInCurrentCanvas(){
  if(fadeIn_alpha > 10){
    fadeIn_alpha = 10;
  }
  if(fadeIn_alpha < 10){
    fadeIn_alpha++;
    var calcfadeIn_alpha = fadeIn_alpha/10;
    // console.log(fadeIn_alpha);
    // console.log(calcfadeIn_alpha);
    setTimeout(function(){
      ctx.clearRect(0,0,appWidth, appHeight);
      ctx.globalAlpha = calcfadeIn_alpha;
      ctx.drawImage(currentCanvas, 0, 0);
      fadeInCurrentCanvas();}, 100);
    return fadeIn_alpha;
  }
  else{
    fadeIn_alpha = 0;
    return;
  }

};

var fadeOut_alpha = 10;

function fadeOutCurrentCanvas(){
  if(fadeOut_alpha <= 0){
    fadeOut_alpha = 0;
  }
  if(fadeOut_alpha > 0){
    fadeOut_alpha--;
    var calcfadeOut_alpha = fadeOut_alpha/10;
    // console.log(fadeOut_alpha);
    // console.log(calcfadeOut_alpha);
    setTimeout(function(){
      ctx.clearRect(0,0,appWidth, appHeight);
      ctx.globalAlpha = calcfadeOut_alpha;
      ctx.drawImage(currentCanvas, 0, 0);
      fadeOutCurrentCanvas();}, 100);
    // return fadeOut_alpha;
  }
  else{
    fadeOut_alpha = 10;
    return;
  }
};

function quickFadeIn(){
  //quick fadeIn
  if(fadeIn_alpha > 10){
    fadeIn_alpha = 10;
  }
  if(fadeIn_alpha < 10){
    fadeIn_alpha++;
    var calcfadeIn_alpha = fadeIn_alpha/10;
    // console.log(fadeIn_alpha);
    // console.log(calcfadeIn_alpha);
    setTimeout(function(){
      ctx.clearRect(0,0,appWidth, appHeight);
      ctx.globalAlpha = calcfadeIn_alpha;
      ctx.drawImage(currentCanvas, 0, 0);
      quickFadeIn();}, 1);
    return fadeIn_alpha;
  }
  else{
    fadeIn_alpha = 0;
    return;
  }
}

function quickFadeOut(){
  if(fadeOut_alpha <= 0){
    fadeOut_alpha = 0;
  }
  if(fadeOut_alpha > 0){
    fadeOut_alpha--;
    var calcfadeOut_alpha = fadeOut_alpha/10;
    // console.log(fadeOut_alpha);
    // console.log(calcfadeOut_alpha);
    setTimeout(function(){
      ctx.clearRect(0,0,appWidth, appHeight);
      ctx.globalAlpha = calcfadeOut_alpha;
      ctx.drawImage(currentCanvas, 0, 0);
      quickFadeOut();}, 1);
    // return fadeOut_alpha;
  }
  else{
    fadeOut_alpha = 10;
    return;
  }
}

function seizureMode(){
  saveCanvas(canvas, ctx);
  quickFadeIn();
  quickFadeIn();
  quickFadeIn();
  quickFadeIn();
}
