Appster
=======

Modular application project framework running NodeJS, express.js and Mustache view engine.

## Code examples:

```js
// Application initialization
Application.init({
  debug: true
});
```

```js
// Script loading
Application.load({
  'sandbox_query': 	'/src/plugins/sandbox.query.jquery.js',
  'sandbox_ajax': 	'/src/plugins/sandbox.ajax.jquery.js',
  
  'app_module': '/module/app.module.js',
  'dependency_module': '/module/app.dependency.module.js'
});
```

```js
// Module registration
Application.module('app_module', ['dependency_module'], function (sandbox) {
  return {
    init: function () {
      // Module initialization logic
    },
    
    destroy: function () {
      // Module destruction logic
    }
  };
});
```

```js
// Start module
Application.start('app_module'); // Dependency module is started automatically
```

```js
// Stop module
Application.stop('app_module');
```

```js
// Start all registred modules
Application.startAll();

// or

// run() method waits until all modules have been loaded and then start all of them
Application.run(function () {
  // Before app start callback
}, function () {
  // After app start callback
});
```

```js
// Stop all registred modules
Application.stopAll();
```
