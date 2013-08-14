var Sandbox = (function () {

  var global = this;

  var events      = {},
      storage       = {};

  sandbox = {

    storage: {
      get: function (key) {
        if (sandbox.storage.has(key)) return storage[key];

        return null;
      },

      set: function (key, value) {
        if (undefined !== value) {
          storage[key] = value;
        }

        return sandbox;
      },

      has: function (key) {
        return (undefined !== storage[key]) ? true : false;
      }
    },

    subscribe: function (event, callback) {
      if (undefined === events[event])
        events[event] = [];

      events[event].push(callback);

      return sandbox;
    },

    unsubscribe: function (event) {
      if (undefined !== events[event]) {
        delete events[event];
      }

      return sandbox;
    },

    notify: function () {
      var event = (arguments[0]) ? arguments[0] : undefined,
        responses = [];

      if (event && (undefined !== events[event])) {
        var args = Array.prototype.splice.call(arguments, 1);

        for (var i = 0; i < events[event].length; i++) {
          var handler = events[event][i];
          
          if (handler && handler.apply) {
            var response = handler.apply(global, args);

            if (undefined !== response) {
              responses.push(response);
            }
          }
        }
      }

      if (1 === responses.length) responses = responses[0];

      return responses;
    },

    log: function () {
      if (console && console.log)
        console.log.apply(console, arguments);
    }

  };

  return sandbox;

}).call(this);

try {
  if (undefined !== exports) {
    exports = module.exports = Sandbox;
  }
} catch(e) {}