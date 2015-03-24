'use strict';

ready(function(di) {
  var
    nodeWrapper = di('nodeWrapper');

  nodeWrapper(window.document).find('head').prepend(
    '<style type="text/css">@charset "UTF-8";.i8-svg-icon{display:inline-block}.i8-svg-icon svg{fill:currentColor}</style>'
  );

});