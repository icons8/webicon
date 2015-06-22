'use strict';

ready(function(injector) {
  var
    nodeWrapper = injector('nodeWrapper'),
    head,
    styleEl,
    styleContent;

  styleContent = '<style type="text/css">@charset "UTF-8";webicon,[webicon],[data-webicon],.webicon,.webicon{display:inline-block;}.svg-webicon svg{fill:currentColor;}</style>';

  head = nodeWrapper(window.document).find('head');
  styleEl = head.find('style')[0];

  if (styleEl) {
    if (styleEl.outerHTML == styleContent) {
      return;
    }
  }

  head.prepend(styleContent);

});