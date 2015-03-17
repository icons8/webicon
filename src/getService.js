
function getService(name) {
  var
    providerName = (name || '') + 'Provider';
  if (!providers.hasOwnProperty(providerName)) {
    throw new Error('provider "' + providerName + '" not found');
  }

  return providers[providerName]();
}