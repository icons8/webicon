
function getService(name) {
  var
    providerName = (name || '') + 'Provider';
  if (!providers.hasOwnProperty(providerName)) {
    throw new Error('"'+providerName+'" not defined');
  }

  return providers[providerName]();
}