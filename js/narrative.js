var script = {
  act1: {
    code: '<html>\n</html>',
    copy: 'here is an html tag'
  },
  act2:{
    code: '<html>\n\t<head>\n\t\t<title></title>\n\t</head>\n</html>',
    copy: 'here is a head tag'
  },
  act3:{
    code: '<html>\n\t<head>\n\t\t<title></title>\n\t</head>\n\t<body>\n\n\n\t</body>\n</html>',
    copy: 'here is a body tag'
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
  $('#helper').text( script['act'+num].copy );
  // $('#editor').text( script['act'+num].code );
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

