(function () {

  Object.prototype.isType = function(type) {
    if (0 <= Object.prototype.toString.call(this).toLowerCase().indexOf(type)) {
      return true;
    }

    return false;
  };

}.call(this));

var Application = (function (window, document, undefined) {

  // Reference to global (window) object
  var global = this;

  // Private application objects
  var core,
    configuration   = {
      debug: false
    },

    // List of application registred modules
    modules     = {},

    // Just a placeholder for my future implementation
    helpers     = {},

    // Loaded scripts
    scripts     = {},

    // Sandbox object that will be passed to modules on runtime
    sandbox     = null;

  // Public application interface
  return core = {
    // Initialize application
    init: function (config) {
      if (config.sandbox) {
        sandbox = config.sandbox;
      }

      if (!sandbox && (undefined !== Sandbox)) {
        sandbox = Sandbox;
      }

      if (config.debug) {
        configuration.debug = true;
      }

      return core;
    },

    load: function (loadModules) {
      if (!loadModules.isType('object')) {
        return false;
      }

      var head = document.querySelector('head');

      for (var moduleId in loadModules) {
        if (loadModules.hasOwnProperty(moduleId)) {
          var module  = loadModules[moduleId],
            url, async = false, callback;

          if (module.isType('string')) {
            url = module;
          } else if (module.isType('object')) {
            if (module.url) {
              url = module.url;
            }

            if (module.async) {
              async = module.async;
            }

            if (module.callback) {
              callback = module.callback;
            }
          }

          if (url && !core.isLoaded(url)) {
            core.debug('Loading module "' + moduleId + '" (' + url + ').');

            var script = document.createElement('script');
            script.src    = url;
            script.async  = async;
            script.type   = 'text/javascript';
            
            if (callback && callback.call) {
              script.onload = callback;
            }

            head.appendChild(script);

            scripts[moduleId] = url;
          } // Load module
        }
      }
    },

    isLoaded: function (url) {
      for (var moduleId in scripts) {
        var loadedUrl = scripts[moduleId];

        if (url === loadedUrl) return true;
      }

      return false;
    },

    // Register new application module
    module: function (moduleId, dependency, callback) {
      if (!callback) {
        callback = dependency;
        dependency = [];
      }

      if (!core.hasModule(moduleId)) {
        modules[moduleId] = {
          instance: null,
          callback: callback,
          dependency: dependency
        };
      }

      return core;
    },

    // getModule: function (moduleId) {
    //  return (core.hasModule(moduleId)) ? modules[moduleId].instance : null;
    // },

    // Check if application has registred module
    hasModule: function (moduleId) {
      return ((undefined !== modules[moduleId]) && modules.hasOwnProperty(moduleId)) ? true : false;
    },

    registredModules: function () {
      
    },

    run: function (beforeStart, afterStart) {
      if (undefined === afterStart) {
        afterStart = beforeStart;
        beforeStart = null;
      }

      window.onload = function () {
        core.startAll();

        if (beforeStart && beforeStart.call) {
          beforeStart.call(core);
        }

        if (afterStart && afterStart.call) {
          afterStart.call(core);
        }
      }
    },

    isStarted: function(moduleId) {
      if (core.hasModule(moduleId) && modules[moduleId].instance) {
        return true;
      }

      return false;
    },

    // Start module logic
    start: function (moduleId) {
      core.debug('Starting module "' + moduleId + '"');

      if (!core.hasModule(moduleId)) return false;

      if (core.isStarted(moduleId)) { 
        core.debug('Module "' + moduleId + '" is already running.'); 

        return core; 
      }

      (function(core, sandbox) {
        var module = modules[moduleId];

        try {
          var moduleDependency = module.dependency;

          if (0 < moduleDependency.length) {
            for (var i = 0; i < moduleDependency.length; i++) {
              var dependencyId = moduleDependency[i];

              if (core.hasModule(dependencyId)) {
                if (core.hasModule(dependencyId) && !core.isStarted(dependencyId)) {
                  core.debug('Starting dependency module "' + dependencyId + '" for "' + moduleId + '"');
                  core.start(dependencyId);
                }

                if (!core.isStarted(dependencyId)) {
                  core.debug(moduleId + ": Dependency '" + dependencyId + "' not started.");
                  return false;
                }
              } else {
                core.debug(moduleId + ": Dependency '" + dependencyId + "' not found.");
                return false;
              }
            }
          }

          var instance = module.callback.call(module, sandbox);

          if (undefined !== instance) {
            module.instance = instance;

            // Initialize module logic
            if (instance.init && instance.init.call) {
              instance.init.call(instance);

              core.debug('Module "' + moduleId + '" started.');
              return true;
            } else {
              core.debug(moduleId + ": init method not found.");
            }
          } else {
            // Background module (can't be restarted) running.
            module.instance = {};

            core.debug('Module "' + moduleId + '" running in background.');
            return true;
          }
        } catch (e) { core.debug(e); }

        return false;
      }).apply(core, [core, sandbox]);

      return core;
    },

    // Stop module logic
    stop: function (moduleId) {
      if (!core.hasModule(moduleId)) return false;

      core.debug('Stopping module "' + moduleId + '".');

      (function() {
        var module = modules[moduleId];

        if (module.instance.destroy) {
          module.instance.destroy.call(module.instance);
          module.instance = null;

          core.debug('Module "' + moduleId + '" stopped.');
        }
      }).apply(core, [core, sandbox]);

      return core;
    },

    // Start all application registred modules
    startAll: function (config) {
      for (var moduleId in modules) {
        if (modules.hasOwnProperty(moduleId)) {
          core.start(moduleId);
        }
      }

      return core;
    },

    // Stop all application registred modules
    stopAll: function () {
      for (var moduleId in modules) {
        if (modules.hasOwnProperty(moduleId)) {
          core.stop(moduleId);
        }
      }

      return core;
    },

    log: function () {
      console.log.apply(console, arguments);
    },

    debug: function () {
      if (configuration.debug) {
        console.debug.apply(console, arguments);
      }
    }
  };

}).call(this, window, document);