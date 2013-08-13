(function () {

  Application.module('idea_details', ['idea_list'], function (sandbox) {
    var __module, $module;

    return __module = {
      init: function () {
        $module = sandbox.query('#idea_details');
        $module.addClass('loaded');
      },

      destroy: function () {

      }
    }; // Module public interface
  });

}.call(this));