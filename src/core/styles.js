'use strict';

ready(function(injector) {
  var
    nodeWrapper = injector('nodeWrapper'),
    head,
    styleEl,
    styleContent;

  styleContent = '<style type="text/css">@charset "UTF-8";i8-icon,i8icon,[i8-icon],[i8icon],[data-i8-icon],[data-i8icon],.i8icon,.i8-icon{display:inline-block;}.i8-svg-icon svg{fill:currentColor;}</style>';

  head = nodeWrapper(window.document).find('head');
  styleEl = head.find('style')[0];

  if (styleEl) {
    if (styleEl.outerHTML == styleContent) {
      return;
    }
  }

  head.prepend(styleContent);

});