function enemy (hp,attack,type) {
  this.hp = hp;
  this.attack = attack;
  this.types = function() {
    if(type==normal || fighting || flying || poison || ground || rock){
      return html;
    }
    else if(type==bug || ghost || steel || fire || water || grass) {
      return css;
    }
    else if(type==electric || psychic || ice || dragon || dark || fairy) {
      return javascript;
    }
  };
}
