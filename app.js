var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var session = require('express-session');
var flash = require('connect-flash');

require('./models/products');
require('./models/orders');
var index = require('./routes/index');
var users = require('./routes/users');
var authRoutes = require('./routes/auth');
var productsRoutes = require('./routes/products');
var userRoutes=require('./routes/user');
var userRoutes=require('./routes/user');
var myOrdersRoutes=require('./routes/MyOrders');
var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27020/MongoDataBase';






var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//home_user_list
app.use('/user',userRoutes);
app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen('9090',function () {
    console.log("starting..");
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/om_gamal");

app.use(session({
  secret:"@#%#$^$%",
  cookie:{maxAge:1000*60*60*24*7}
}));
app.use(flash());

app.use(express.static('public'));


app.use('/', index);
app.use('/users', users);
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/myOrders',myOrdersRoutes);
//Auth
app.use(function(req,res,next){
  if (!(req.session.username && req.session.pass))
  {
    res.redirect('/auth/login');
  }else{
    resp.locals={
      name:req.session.username
    }
    next();
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
