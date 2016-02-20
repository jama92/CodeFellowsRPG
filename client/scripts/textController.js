

var textBox = new Image();

function showTextBox() {


  console.log('show Text Box');


  textBox.src = 'images/battleScene/heroStatus.png';
  textBox.xcoord = 14;
  textBox.ycoord = 14;


  ctx.drawImage(textBox, textBox.xcoord, textBox.ycoord);

}


function hideTextBox() {

  clearCanvas(ctx);
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,appWidth, appHeight);
  setTimeout(function(){
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


    console.log('transition complete!'); }, 10);
}
