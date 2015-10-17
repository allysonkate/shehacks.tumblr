$('#splash-btn').on('click', function() {
  $('.editor-wrapper').toggleClass('editor--active');
  $('.helper-wrapper').toggleClass('helper--active');
  $('.splash').fadeOut(200);
});
$('.helper-tab').on('click', function () {
  $('.helper-wrapper').toggleClass('helper--view');
});
$('.editor-tab').on('click', function () {
  $('.editor-wrapper').toggleClass('editor--view');
});
var preview = document.getElementById('preview');

var interval;
var editor = CodeMirror(document.getElementById('editor'), {
  value: "<html>\n\t<head>\n\t\t<title></title>\n\t</head>\n\t<body>\n\n\n\t</body>\n</html>",
  mode: "text/html",
  lineNumbers: true,
  matchBrackets: true,
  indentWithTabs: true,
  tabSize: 4,
  indentUnit: 4
});
editor.on('change', function () {
  clearTimeout(interval);
  interval = setTimeout(update, 500);
});

var update = function () {
  var value = editor.getValue();
  if ( validate( value ) ) {
    // remove previous iframe
    if ( preview.children.length > 0 ) {
      preview.removeChild( preview.firstChild );
    }
    //
    var iframe = document.createElement( 'iframe' );
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    preview.appendChild( iframe );
    var content = iframe.contentDocument || iframe.contentWindow.document;
    // workaround for chrome bug
    // http://code.google.com/p/chromium/issues/detail?id=35980#c12
    value = value.replace( '<script>', '<script>if ( window.innerWidth === 0 ) { window.innerWidth = parent.innerWidth; window.innerHeight = parent.innerHeight; }' );
    content.open();
    content.write( value );
    content.close();
  }
};
var errorLines = [];
var widgets = [];
var validate = function ( value ) {
  return editor.operation( function () {
    while ( errorLines.length > 0 ) {
      editor.removeLineClass( errorLines.shift(), 'background', 'errorLine' );
    }
    for ( var i = 0; i < widgets.length; i ++ ) {
      editor.removeLineWidget( widgets[ i ] );
    }
    widgets.length = 0;
    // remove html
    var string = '\n';
    var lines = value.split( '\n' );
    var lineCurrent = 0, lineTotal = lines.length;
    while ( lineCurrent < lineTotal && lines[ lineCurrent ].indexOf( '<script>' ) === -1 ) {
      string += '\n';
      lineCurrent ++;
    }
    var lineStart = lineCurrent ++;
    while ( lineCurrent < lineTotal && lines[ lineCurrent ].indexOf( '<\/script>' ) === -1 ) {
      string += lines[ lineCurrent ] + '\n';
      lineCurrent ++;
    }
    //
    try {
      var result = esprima.parse( string, { tolerant: true } ).errors;
      for ( var i = 0; i < result.length; i ++ ) {
        var error = result[ i ];
        var message = document.createElement( 'div' );
        message.className = 'esprima-error';
        message.textContent = error.message.replace(/Line [0-9]+: /, '');
        var lineNumber = error.lineNumber - 1;
        errorLines.push( lineNumber );
        editor.addLineClass( lineNumber, 'background', 'errorLine' );
        var widget = editor.addLineWidget(
          lineNumber,
          message
        );
        widgets.push( widget );
      }
    } catch ( error ) {
      var message = document.createElement( 'div' );
      message.className = 'esprima-error';
      message.textContent = error.message.replace(/Line [0-9]+: /, '');
      var lineNumber = error.lineNumber - 1;
      errorLines.push( lineNumber );
      editor.addLineClass( lineNumber, 'background', 'errorLine' );
      var widget = editor.addLineWidget(
        lineNumber,
        message
      );
      widgets.push( widget );
    }
    return errorLines.length === 0;
  });
};
update();
