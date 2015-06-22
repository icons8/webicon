'use strict';

if (typeof jQuery != 'undefined' && jQuery.fn.i8icon) {
  jQuery.fn.i8icon.extension(extensionBinder);
}
if (typeof angular != 'undefined' && angular.module('i8.icon')) {
  angular.module('i8.icon').config([
    '$i8IconProvider',
    function($i8IconProvider) {
      $i8IconProvider.extension(extensionBinder)
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
