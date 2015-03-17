'use strict';

function Icon(element, options) {
  var
    el = getService('nodeWrapper'),
    svgElement,
    attributes,
    index,
    originNode,
    iconSize = null,
    viewBox = null;

  if (options) {
    switch(typeof options) {
      case 'number':
        iconSize = options;
        break;
      case 'string':
        viewBox = options;
        break;
      default:
        iconSize = options.iconSize || iconSize;
        viewBox = options.viewBox || viewBox;
    }
  }

  element = el(element);
  originNode = element[0];

  element.removeAttr('id');

  if (originNode.tagName != 'svg') {
    if (originNode.tagName == 'symbol') {
      svgElement = el('<svg xmlns="http://www.w3.org/2000/svg">');
      attributes = originNode.attributes;
      for (index = 0; index < attributes.length; index++) {
        svgElement.attr(attributes[index].name, attributes[index].value);
      }
      element = svgElement.append(originNode.children);
    }
    else {
      element = el('<svg xmlns="http://www.w3.org/2000/svg">').append(element);
    }
  }

  if (!element.attr('xmlns')) {
    element.attr('xmlns', "http://www.w3.org/2000/svg");
  }

  iconSize = iconSize || iconManager._defaultIconSize;

  element.attr({
    fit: '',
    height: '100%',
    width: '100%',
    preserveAspectRatio: 'xMidYMid meet',
    viewBox: element.attr('viewBox') || viewBox || ('0 0 ' + iconSize + ' ' + iconSize)
  });

  element.css({
    "pointer-events": 'none',
    display: 'block'
  });

  this.node = element[0];
  this.iconSize = iconSize;
}

Icon.isIcon = function(value) {
  return value instanceof Icon;
};

Icon.loadByUrl = function(url, iconSize) {
  return svgLoader.loadByUrl(url)
    .then(function(element) {
      return new Icon(
        element,
        iconSize
      )
    });
};

Icon.prototype = {

  clone: function() {
    return this.node.cloneNode(true);
  }

};
