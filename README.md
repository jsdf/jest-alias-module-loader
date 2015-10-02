# jest-alias-module-loader

Jest doesn't really have a simple way of globally replacing certain modules, but I've come up with a couple. Firstly, the hacky and gross way to [replace modules is by using a regexp replace in the preprocessor](https://github.com/facebook/react/pull/4656/files). But let's not do that. Instead, this module extends the default `HasteModuleLoader` to allow us to alias some modules at `require` time:

```js
// test/aliasedModuleLoader.js

var JestAliasModuleLoader = require('jest-alias-module-loader');

module.exports = JestAliasModuleLoader({
   aliasedModules: {
    // use compiled react for faster loading
    'react': 'react/dist/react-with-addons',
    'react/addons': 'react/dist/react-with-addons',
  },
});
```

To use this, just add a line to your Jest config (eg. in `package.json`):

```json
{
  "jest": {
    "moduleLoader": "<rootDir>/test/aliasedModuleLoader.js"
  }
}
```
