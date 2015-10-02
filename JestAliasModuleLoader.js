var HasteModuleLoader = require('jest-cli/src/HasteModuleLoader/HasteModuleLoader');
var util = require('util');
var assign = require('object.assign');

function JestAliasModuleLoader(config) {
  if (!config && config.aliasedModules) throw new Error('aliasedModules not defined');

  // a subclass of jest's HasteModuleLoader
  // allows us to alias module requires 
  function CustomModuleLoader() {
    HasteModuleLoader.apply(this, arguments); // super
  }

  assign(CustomModuleLoader, HasteModuleLoader);
  util.inherits(CustomModuleLoader, HasteModuleLoader);

  // override method
  CustomModuleLoader.prototype.requireModule = function(currPath, moduleName, bypassRegistryCache) {
    var aliasedModuleName = config.aliasedModules[moduleName] || moduleName;

    return HasteModuleLoader.prototype.requireModule.call(this, currPath, aliasedModuleName, bypassRegistryCache);
  };

  return CustomModuleLoader;
}

module.exports = JestAliasModuleLoader;
