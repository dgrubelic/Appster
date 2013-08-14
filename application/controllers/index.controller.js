var application = module.parent.exports.application,
		Sandbox 		= module.parent.exports.Sandbox;

application.get('/', function (request, response) {
	sandbox.notify('index.load', request, response);
});

Sandbox.subscribe('index.load', function (request, response) {
	console.log('index.controller saying hello :)');

	response.render('index/index.mustache');
});