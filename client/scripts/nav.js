(function(module) {
  var data = {
    home: {
      header: 'Home',
      body: 'Welcome to Code Fellows RPG! Are you ready for the adventure of a lifetime? Press "New Game" to start playing!'
    },
    about: {
      header: 'About Code Fellows RPG',
      body: 'Code Fellows RPG was created as a final project for Code 301 as a demonstration of what we have learned in class. The front-end uses jQuery, skeletonjs, and handlebars.js. The back-end server uses Express, request, serve-static, fs, and sqlite3. The server serves as a RESTful api, serving information that it downloads from the pokeapi.co api upon startup.'
    },
    github: {
      header: 'Github Information',
      body: 'The project repo may be found <a href="https://github.com/KCXinYuan/CodeFellowsRPG">here</a>.'
    }

  };


  function displayArticle(data){
    var template = Handlebars.compile($('#article-template').text());
    $('#hook').html(template(data));
  }


  $(document).ready(function(){
    displayArticle(data.home);
  });

  $('.nav').click(function(event){
    var button = event.target.id.replace('-button', '');
    switch(button){
    case 'home':
      displayArticle(data.home);
      break;
    case 'about':
      displayArticle(data.about);
      break;
    case 'github':
      displayArticle(data.github);
      break;
    }
  });

})(window);
