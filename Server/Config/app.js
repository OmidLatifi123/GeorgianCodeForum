// required node modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

// additional dependencies
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

// Routing modules
const indexRouter = require('../Routes/index');
const postRouter = require('../Routes/post');
const authRouter = require('../Routes/auth');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// db connection - must be after express app instantiated
mongoose.connect(process.env.CONNECTION_STRING, {})
.then((res) => { console.log('Connected to MongoDB') })
.catch((err) => { console.log(`Connection failure: ${err}`) });

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

// passport config BEFORE routers
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// link passport to User model
const User = require('../Models/user');
passport.use(User.createStrategy());

const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const CLIENT_ID = '849012406795-9cf37us63auqqqv4dv8c5saq5nuf1juo.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const GITHUB_CLIENT_ID = 'a6c2931ee69142f7856c'
const GITHUB_CLIENT_SECRET = '783aba7039d7196ac62de38d0ae503156b9f984e'

passport.use(new GoogleStrategy({
    clientID:     CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async(request, accessToken, refreshToken, profile, done) =>{
    try{
        let user = await User.findOne({username:profile.displayName})
        if(user){
            done(null, user)
        }
        else{
            user = await User.register(new User({ username: profile.displayName }), profile.id)
            done(null, user)
        }
    } catch(err){
        console.log(err)
    }
  }
  ));

  passport.use(new GithubStrategy({
    clientID:     GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
  },
  async(request, accessToken, refreshToken, profile, done) =>{
    console.log(profile)
    try{
        let user = await User.findOne({username:profile.username})
        if(user){
            done(null, user)
        }
        else{
            user = await User.register(new User({ username: profile.username }), profile.id)
            done(null, user)
        }
    } catch(err){
        console.log(err)
    }
  }
  ));
  // passport.serializeUser((user, done)=>{
  //   done(null, user.id)
  // });
  // passport.deserializeUser((id, done)=>{
  //   User.findById(id, (err, user) => done(err, user))
  // });

// link User model w/passport session mgmt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// Omid Latifi
// 1199455

// error handler
app.use(function(err, req, res, next) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: `Error: ${err.status}`, page: 'error'});
});

module.exports = app;