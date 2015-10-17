var script = {
  act1: {
    code: '',
    copy: '<h2>Start from Scratch</h2>' +
    'Let\'s start with this template to build your own custom theme. By using these simple HTML ' +
    '<div class="tool-tip"><div class="tool-tip__inner">tags</div><div class="tool-tip__info">Tags are keywords (tag names) surrounded by angle brackets that define segments of your code and keep things organized.</div></div>' +
    '. You can change the world &mdash; but first, let\'s start with your head&hellip;'
  },
  act2:{
    code: '<html>\n\n\t<head>\n\t</head>\n\n</html>',
    copy: '<h2>Your "<head>"</h2>' + 'The <head> tag contains information about the page. It holds your title, which appears above the address bar, and all styling for your page (colors, fonts, etc).'
  },
  act3:{
    code: '<html>\n\n\t<head>\n\t\n\t<title></title>\n\t</head>\n\n</html>',
    copy: '<h2>Your <title></h2>' + 'The <title> tag appears above the address bar and shows up in search results. It’s meant to be a short descriptor of your page. Be sure to always close your tags. Try closing the title tag. <em></title></em>'
  },
  act4:{
    code: '<html>\n\n\t<head>\n\t\t<title></title>\n\t</head>\n\t<body>\n\n\n\t</body>\n\n</html>',
    copy: 'here is a <div class="tool-tip"><div class="tool-tip__inner">body</div><div class="tool-tip__info">Here is information about what a body tag is!</div></div> tag'
  },
  act5:{
    code:'',
    copy:''
  },
  act6:{
    code:'',
    copy:''
  },
  act7:{
    code:'',
    copy:''
  },
  act8:{
    code:'',
    copy:''
  }
}
function getHTMLSample( num, fileName ){
  var string = '';
  var req = new XMLHttpRequest();
  req.open("GET", fileName, true);
  req.addEventListener("load", function() {
    script['act'+num].code = req.responseText;
  });
  req.send(null);
}
getHTMLSample( 1, "code/one.html");
getHTMLSample( 2, "code/two.html");
getHTMLSample( 3, "code/three.html");
getHTMLSample( 4, "code/four.html");
getHTMLSample( 5, "code/five.html");
getHTMLSample( 6, "code/six.html");
getHTMLSample( 7, "code/seven.html");
getHTMLSample( 8, "code/eight.html");

function getCopySample( num, fileName ){
  var string = '';
  var req = new XMLHttpRequest();
  req.open("GET", fileName, true);
  req.addEventListener("load", function() {
    script['act'+num].copy = req.responseText;
  });
  req.send(null);
}

getCopySample( 1, "copy/one.html");
getCopySample( 2, "copy/two.html");
getCopySample( 3, "copy/three.html");
getCopySample( 4, "copy/four.html");
getCopySample( 5, "copy/five.html");
getCopySample( 6, "copy/six.html");
getCopySample( 7, "copy/seven.html");
getCopySample( 8, "copy/eight.html");

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

var currentAct = 0;

function newAct( num ){
  $('#helper').html( script['act'+num].copy );
  editor.setValue( script['act'+num].code );
}

$('#helper-prev').on('click',function(){
  currentAct--;
  if (currentAct < 1) {
    currentAct = 1;
  };
  newAct( currentAct );
});

$('#helper-next').on('click',function(){
  currentAct++;
  if (currentAct > Object.size(script)) {
    currentAct = Object.size(script);
  };
  if (currentAct == 8) {
    userTitle = $('#title').val();
    userDescription = $('#description').val();
  }
  newAct( currentAct );
});

