(function () {

	Application.module('idea_comments', ['idea_list'], function (sandbox) {
		var __module, $module;

		return __module = {
			init: function () {
				$module = sandbox.query('#idea_comments');
				$module.addClass('loaded');
			},

			destroy: function () {
				$module.removeClass('loaded');
			}
		};
	});

}.call(this));