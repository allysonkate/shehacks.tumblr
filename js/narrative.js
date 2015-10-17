var script = {
  act1: {
    code: '<html>\n\n\n</html>',
    copy: 'here is an html tag'
  },
  act2:{
    code: '<html>\n\n\t<head>\n\t\t<title></title>\n\t</head>\n\n</html>',
    copy: 'here is a head tag'
  },
  act3:{
    code: '<html>\n\n\t<head>\n\t\t<title></title>\n\t</head>\n\t<body>\n\n\n\t</body>\n\n</html>',
    copy: 'here is a <div class="tool-tip"><div class="tool-tip__inner">body</div><div class="tool-tip__info">Here is information about what a body tag is!</div></div> tag'
  }
}
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
  newAct( currentAct );
});

