'use strict';

di('SvgIcon', function(injector) {
  var
    AbstractElementIcon = injector('AbstractElementIcon'),
    inherit = injector('inherit')
    ;

  function SvgIcon(element, options) {
    var
      SVG_ICON_CLASS = 'svg-webicon',
      nodeWrapper = injector('nodeWrapper'),
      iconManager = injector('iconManager'),
      parseSvgOptions = injector('parseSvgOptions'),
      svgElement,
      svgNode,
      attributes,
      styles,
      defaultAttributes,
      index,
      width,
      height,
      node,
      iconSize;

    options = parseSvgOptions(options);

    [
      'id',
      'x',
      'y'
    ].forEach(function(attr) {
        element.removeAttr(attr);
      });

    node = element[0];
    if (node.tagName != 'svg') {
      if (node.tagName == 'symbol') {
        svgElement = nodeWrapper('<svg xmlns="http://www.w3.org/2000/svg">');
        svgNode = svgElement[0];
        attributes = node.attributes;
        for (index = 0; index < attributes.length; index++) {
          svgNode.setAttribute(attributes[index].name, attributes[index].value);
        }
        element = svgElement.append(nodeWrapper(node).children());
      }
      else {
        element = nodeWrapper('<svg xmlns="http://www.w3.org/2000/svg">').append(element);
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

    iconSize = options.iconSize || iconManager.getDefaultSvgIconSize();

    attributes = {
      fit: '',
      height: '100%',
      width: '100%',
      preserveAspectRatio: 'xMidYMid meet',
      viewBox: node.getAttribute('viewBox') || options.viewBox
    };

    if (!attributes.viewBox) {
      width = node.getAttribute('width');
      height = node.getAttribute('height');
      if (width !== null && height !== null ) {
        attributes.viewBox = '0 0 ' + parseFloat(width) + ' ' + parseFloat(height);
      }
    }
    attributes.viewBox = attributes.viewBox || '0 0 ' + iconSize + ' ' + iconSize;

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

    this.iconSize = iconSize;
    AbstractElementIcon.call(this, SVG_ICON_CLASS, element);
  }

  SvgIcon.loadByUrl = function(url, options) {
    var
      loadSvgByUrl = injector('loadSvgByUrl');

    return loadSvgByUrl(url)
      .then(function(element) {
        return new SvgIcon(
          element,
          options
        )
      });
  };

  return inherit(SvgIcon, AbstractElementIcon);

});
