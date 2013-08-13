var application = module.parent.exports.application;

application.get('/', function (request, response) {
  response.render('index/index.mustache');
})