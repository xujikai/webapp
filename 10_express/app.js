const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/api');
const test = require('./routes/test');

/**
 * /save/:name        req.params.name
 * /save?name=xxx     req.query.name
 * post请求           req.body.name
 */

const app = express();
const mongoose = require('mongoose');

// 连接mongodb数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.0.92:27017/mydb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('数据库连接成功');
});

// jade渲染
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// html渲染
const ejs = require('ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('.html',ejs.__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api',api);
app.use('/test',test);
// 匹配客户端页面url路径
app.use('/xxx/*', index);
// app.get('/test/get',function (req,res,next) {
//     // res.send('test/get');
//     console.log('test/get');
//     next();
// },function (req,res) {
//     res.send('test/get/2');
//     console.log('test/get/2');
// });
// app.post('/test/post',function (req,res) {
//     res.send('test/post');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
