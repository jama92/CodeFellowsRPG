//TODO: Render
//TODO: Request "animation frame"

//Initialize canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//create all global variables
var lastTime;
var gameTime = 0;
var appWidth = canvas.getAttribute('width');
var appHeight = canvas.getAttribute('height');

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

//resource prep
resources.load([
  //TODO add sprite sheets paths
    '..',
    '...',
    '...'
]);

resources.onReady(initialize);


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
