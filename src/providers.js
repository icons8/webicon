'use strict';

var providers = {

  logProvider: providerAbstractPlaceholder('logProvider'),

  timeoutProvider: providerAbstractPlaceholder('timeoutProvider'),

  nodeWrapperProvider: providerAbstractPlaceholder('nodeWrapperProvider'),

  PromiseProvider: providerAbstractPlaceholder('PromiseProvider'),

  httpGetProvider: providerAbstractPlaceholder('httpGetProvider'),

  mergeObjectsProvider: providerAbstractPlaceholder('mergeObjects')

};

function providerAbstractPlaceholder(name) {
  return function() {
    throw new Error('provider "' + name + '" not defined');
  }
}