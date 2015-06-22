'use strict';

if (typeof jQuery != 'undefined' && jQuery.fn.webicon) {
  jQuery.fn.webicon.extension(extensionBinder);
}
if (typeof angular != 'undefined' && angular.module('webicon')) {
  angular.module('webicon').config([
    '$webiconProvider',
    function($webiconProvider) {
      $webiconProvider.extension(extensionBinder)
    }
  ])
}

function extensionBinder(injector) {

  (extension.extensions || []).forEach(function(extension) {
    extension(injector);
  });
  extension.listeners = extension.listeners || [];
  extension.listeners.push(function(extension) {
    extension(injector);
  });
}

function extension(fn) {
  var
    listeners,
    extensions;

  listeners = extension.listeners = extension.listeners || [];
  extensions = extension.extensions = extension.extensions || [];

  if (typeof fn != 'function') {
    console.error('Extension is not a function');
    return;
  }
  extensions.push(fn);
  listeners.forEach(function(listener) {
    listener(fn);
  });
}
