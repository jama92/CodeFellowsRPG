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
