var FPS = 60;
var now = Date.now();
var dt;
var last = now;//check for animation frame function supported by browser. if IE9 use setInterval
var animationFrame = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    null ;if (animationFrame !== null) {  function repeatAnimate() {    now = Date.now();
   dt = (now - last) / 1000;    // duration in seconds
   update(dt);
   last = now;
   animationFrame(repeatAnimate, canvas);    // fix to 60fps
   // setTimeout(function() {
   //   update();
   // }, 1000/FPS);
 };  //call frame repeatedly
 animationFrame(repeatAnimate, canvas);}
else {
 //fallback update for IE9
 setInterval(update, 1000/FPS);
}function main (){
 //create variables for keeping track of change in time between game updates (delta time)};function initialize(){
 //TODO add initial map state};function update(dt){
 gameTime += dt;
 checkInput();
 updateEntities();
 render();
 console.log('update');};function checkInput(){
 //TODO add logic for different keydowns or mouse events};function updateEntities(){
 //TODO add logic to update changes made to sceen or map};//draw everything
function render(){
 //TODO add logic to display elements at correct locations};
