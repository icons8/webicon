'use strict';

function Icon(element, options) {
  var
    el = getService('nodeWrapper'),
    svgElement,
    svgNode,
    attributes,
    styles,
    defaultAttributes,
    index,
    originNode,
    node,
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
      svgNode = svgElement[0];
      attributes = originNode.attributes;
      for (index = 0; index < attributes.length; index++) {
        svgNode.setAttribute(attributes[index].name, attributes[index].value);
      }
      element = svgElement.append(originNode.children);
    }
    else {
      element = el('<svg xmlns="http://www.w3.org/2000/svg">').append(element);
    }
  }
  node = element[0];

  defaultAttributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    version: '1.0'
  };

  Object.keys(defaultAttributes)
    .forEach(function(name) {
      if (!node.getAttribute(name)) {
        node.setAttribute(name, defaultAttributes[name]);
      }
    });

  iconSize = iconSize || iconManager._defaultIconSize;

  attributes = {
    fit: '',
    height: '100%',
    width: '100%',
    preserveAspectRatio: 'xMidYMid meet',
    viewBox: node.getAttribute('viewBox') || viewBox || ('0 0 ' + iconSize + ' ' + iconSize)
  };

  Object.keys(attributes)
    .forEach(function(name) {
      node.setAttribute(name, attributes[name]);
    });

  styles = {
    "pointer-events": 'none',
    display: 'inline-block'
  };

  Object.keys(styles)
    .forEach(function(name) {
      node.style[name] = styles[name];
    });

  this.node = node;
  this.iconSize = iconSize;
}

Icon.isIcon = function(value) {
  return value instanceof Icon;
};

Icon.loadByUrl = function(url, options) {
  return svgLoader.loadByUrl(url)
    .then(function(element) {
      return new Icon(
        element,
        options
      )
    });
};

Icon.prototype = {

  clone: function() {
    return this.node.cloneNode(true);
  }

};
