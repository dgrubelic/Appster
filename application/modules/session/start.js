(function () {
	
	Application.module('session_start', function (sandbox) {
		var __module;

		var session;

		sandbox.request({ url: '/session/1', dataType: 'json', async: false }, 
			function (response) {
				session = response;

				sandbox.storage.set('session', session);
			}, function (error) {
				// Handle error
			});
	});

}.call(this));