'use strict';

function ready(fn) {
  var
    listeners;

  listeners = ready.listeners = ready.listeners || [];

  if (typeof fn == 'function') {
    listeners.push(fn);
  }
  else if (fn) {
    console.error('Ready listener not a function');
  }

}
