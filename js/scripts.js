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
var userTitle = "foo";
var userDescription = "bar";
var editor = CodeMirror(document.getElementById('editor'), {
  value: "",
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
var tumblrBlocks = function (value) {
  var results = "";

  HTMLParser(value, {
    start: function( tag, attrs, unary ) {
      results += "<" + tag;
      for ( var i = 0; i < attrs.length; i++ )
        results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
      results += (unary ? "/" : "") + ">";
    },
    end: function( tag ) {
      results += "</" + tag + ">";
    },
    chars: function( text ) {
      if (text == '{Title}') {
        text = userTitle;
      }
      if (text == '{Description}') {
        text = userDescription;
      }
      results += text;
    },
    comment: function( text ) {
      results += "<!--" + text + "-->";
    }
  });
  return results;
};
var saveUserChanges = function (value) {
  var results = "";

  HTMLParser(value, {
    start: function( tag, attrs, unary ) {
      results += "<" + tag;

      for ( var i = 0; i < attrs.length; i++ )
        results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

        results += (unary ? "/" : "") + ">";
      },
      end: function( tag ) {
        results += "</" + tag + ">";
      },
      chars: function( text ) {
        results += text;
      },
      comment: function( text ) {
        results += "<!--" + text + "-->";
      }
  });
  return results;
};
var update = function () {
  var value = editor.getValue();
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
  value = tumblrBlocks(value);
  value = saveUserChanges(value);
  content.open();
  content.write( value );
  content.close();
};
update();
