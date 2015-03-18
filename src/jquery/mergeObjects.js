
function mergeObjects(/* to, from [, from[, ...]]*/) {
  var
    args = Array.prototype.slice.call(arguments);

  switch(args.length) {
    case 0: args.push({});
    case 1: args.push({});
  }

  return jQuery.extend.apply(jQuery, [true].concat(args));
}