// required node modules
import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import hbs from 'hbs';

// Routing modules
import indexRouter from '../Routes';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'hbs');

// register hbs helpers
hbs.registerPartials(path.join(__dirname, '../Views/components/'));
hbs.registerPartials(path.join(__dirname, '../Views/content/'));

hbs.registerHelper('loadPage', function (pageName) 
{
  console.log("pageName: " + pageName);
  return pageName
});


// middleware configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: `Error: ${err.status}`, page: 'error'});
});

export default app;

module.exports = app;