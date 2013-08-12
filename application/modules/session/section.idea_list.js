(function () {

	Application.module('idea_list', ['session_start'], function(sandbox) {
		var __module, $module,
			ideas;

		ideas = [
			{ id: 1, name: "First idea"},
			{ id: 2, name: "Second idea"}
		];

		return __module = {
			init: function () {
				// Fetch module container
				$module = sandbox.query('#idea_list');

				

				// Define module as loaded
				$module.addClass('loaded');
			},

			destroy: function () {
				
			}
		}; // Module public interface
	});

}.call(this));