// Include express framework and initialize application
var mu2express = require("mu2Express"),
  express   = require("express"),
  application = exports.application   = module.exports.application = express(),
  server    = exports.server    = require("http").createServer(application);

application.configure(function () {
  // Path setup
  application.use(express.static(__dirname + '/application'));
  application.use('/module', express.static(__dirname + '/application/modules'));
  application.use('/src', express.static(__dirname + '/src'));
  application.use('/static', express.static(__dirname + '/static'));
  application.use('/js', express.static(__dirname + '/public/assets/javascript'));
  application.use('/css', express.static(__dirname + '/public/assets/css'));
  application.use('/image', express.static(__dirname + '/public/assets/images'));

  application.set("views", __dirname + '/application/views');

  application.engine('mustache', mu2express.engine);
  application.set('view engine', 'mustache');

  application.use(express.compress());
  application.use(express.bodyParser());
  application.use(express.cookieParser());
  application.use(express.cookieSession({
    secret: "SET-YOUR-SECRET-SESSION-KEY-HERE"
  }));
});

require(__dirname + '/application/controllers/index.controller.js');
require(__dirname + '/application/controllers/session.controller.js');

server.listen(3000);
console.log("Server started at port 3000...");