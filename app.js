const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const cors_instance = require('./utils/cors/cors')
const token = require('./utils/token/token')

const loginRouter = require('./routes/login/login');
const accountRouter = require('./routes/account/account');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(cors_instance.getCorsOptions()))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const url = req.url;
  // 不需要token验证的请求
  const whiteList = ['/api/login/userLogin', '/api/login/getImageCode']
  if (whiteList.includes(url)) {
    return next();
  } else {
    const t = req.headers.authorization
    const user_code = req.headers.user_code
    if (!(await token.verify(t, { user_code: user_code }))) {
      res.json({ code: 200, message: 'token验证失败' })
    } else {
      return next();
    }
  }
})


app.use('/api/login', loginRouter);
app.use('/api/account', accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
