'use strict';

var providers = {

  logProvider: function() {
    return log;
  },

  nodeWrapperProvider: providerAbstractPlaceholder('nodeWrapperProvider'),

  PromiseProvider: providerAbstractPlaceholder('PromiseProvider'),

  httpGetProvider: providerAbstractPlaceholder('httpGetProvider')

};

function providerAbstractPlaceholder(name) {
  return function() {
    throw new Error('provider "' + name + '" not defined');
  }
}