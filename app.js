/**
 * Module dependencies.
 */

var express  = require('express'),
    path     = require('path'),
    routes   = require('./routes');



var app = express();



/**
 * Express configuration.
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res) {
  res.status(404).render('404', {title: 'Not Found :('});
});

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

routes(app);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
