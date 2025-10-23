var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');
var indexRouter = require('./routes/index');
// `./routes/users` is a Mongoose model (User), not an Express router.
// Require it as `User` so we can use its passport helpers without mounting it as middleware.
var User = require('./routes/users');
const passport = require('passport');
const flash = require('connect-flash');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(expressSession({
  resave: false,
  saveUninitialized:false,
  secret: 'hey hey hey',
}))
app.use(passport.initialize());
app.use(passport.session());  
// `User` is the mongoose model (passport-local-mongoose adds these helpers)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Do not mount the User model as middleware. If you later add a users router,
// create a separate file (e.g. routes/usersRouter.js) and mount it here.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // expose status to the view (template expects a `status` variable)
  res.locals.status = err.status || 500;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
