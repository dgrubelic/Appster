var application = module.parent.exports.application;

/*

Session controller actions

*/

application.get('/session/:id', function (request, response) {
	response.format({
		html: function () {
			response.render('session/details.mustache');
		},

		json: function () {
			response.send({ id: 1, name: "My session" });
		}
	});
});

application.get('/session', function (request, response) {
	response.format({
		html: function () {
			response.render('session/index.mustache');
		},

		json: function () {
			// Return list of all sessions
		}
	});
});