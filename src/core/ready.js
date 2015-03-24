'use strict';

function ready(fn) {
  var
    functions;

  functions = ready.functions = ready.functions || [];

  if (fn) {
    functions.push(fn);
  }
  else {
    functions.forEach(function(fn) {
      fn(di);
    });
  }
}
