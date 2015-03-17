
/**
 * @see https://github.com/angular/angular.js/blob/master/src/ng/http.js#L1138
 */

function buildUrl(url, params) {
  if (!params) {
    return url;
  }
  var
    parts = [],
    keys;

  keys = Object.keys(params);
  keys.forEach(function(key) {
    var
      value = params[key];
    if (value === null || typeof value == 'undefined') {
      return;
    }
    if (!Array.isArray(value)) {
      value = [value];
    }

    value.forEach(function(v) {
      if (typeof v == 'object') {
        if (v instanceof Date) {
          v = v.toISOString();
        }
        else {
          v = JSON.stringify(v);
        }
      }
      parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
    });
  });

  if (parts.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + parts.join('&');
  }
  return url;
}


/**
 * @see https://github.com/angular/angular.js/blob/master/src/Angular.js#L1250
 */

function encodeUriQuery(val, pctEncodeSpaces) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%3B/gi, ';').
    replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
}