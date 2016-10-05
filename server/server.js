var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var history = require('connect-history-api-fallback');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var utils = require('./utilities');
var logger = require('morgan');

var RedisStore = require('connect-redis')(session);
var server = express();
var router = require('./router');

// // API Calls for AUTH Redirects
// //require('./authenticationRoutes')(server, express);
// require('./middleware.js')(server, express);

// Populates req.session
server.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  secret: 'keyboard cat',
  store: new RedisStore({
    logErrors: true
  })
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ 'extended': false }));
server.use(logger('dev'));


/*********************************/
/*********************************/
  //API CALLS FOR AUTHENTICATION//
/*********************************/
/*********************************/
server.get('*/reset.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/styles/reset.css'));
});
server.get('*/styles.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/styles/styles.css'));
});

//image serving work-around
// server.get('*/assets/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/assets'));
// });


server.get('/login', function(req, res) {

  if (utils.isAuth(req, res) === true) {
    console.log('YOU ARE BEING REDIRECTED from isAuth');
    console.log('NO AUTH HERE IS REQ.SESSION', req.session);
    res.redirect('/dashboard');
  } else {
    console.log('YES AUTH HERE IS REQ.SESSION', req.session);
    res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
  }
});

server.get('/signup', function(req, res) {
  if (utils.isAuth(req, res) === true) {
    console.log('YOU ARE BEING REDIRECTED');
    res.redirect('/dashboard');
  } else {
    res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
  }
});
server.get('/dashboard', function(req, res) {
  if (utils.isAuth(req, res) === false) {
    console.log('YOU ARE BEING REDIRECTED');
    res.redirect('/login');
  } else {
    res.sendFile(path.resolve(__dirname + '/../client/index.html' ));
  }
});

server.get('/userCategories*', function (req, res) {
  console.log('Received GET @ /userCategories', req.body);
  utils.getUserCategories(req, res);
});

server.use(history());

server.use(express.static(path.join(__dirname, '../client/')));

require('./router.js')(server);
//server.use(history());


//server.use(express.static(path.join(__dirname, '../client')));

var port = process.env.port || 3000;
server.listen(port, function() {
  console.log('Server is listening on port ' + port + '!');
});

module.exports = server;
