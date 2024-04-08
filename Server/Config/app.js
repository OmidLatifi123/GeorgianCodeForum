// required node modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const Post = require('../Models/post');
const File = require('../Models/file');

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

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async(request, accessToken, refreshToken, profile, done) =>{
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


// FILE UPLOAD ////////////////////////////////////////////////////////

// Initialize GridFS
// let gfs;
// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//     url: 'mongodb+srv://olatifi:GCF2024@cluster0.aaruybt.mongodb.net/media',
//     file: (req, file) => {
//         return {
//             filename: file.originalname,
//             contentType: file.mimetype
//         };
//     }
// });
// const upload = multer({ storage });

// // Handle file upload
// app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         const newFile = new File({
//             filename: req.file.filename,
//             contentType: req.file.contentType
//         });
//         const savedFile = await newFile.save();
//         res.json(savedFile);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });

// // Handle POST creation
// app.post('/post', async (req, res) => {
//     try {
//         const { postTitle, postContent, postCode, createdAt, username, comment, file } = req.body;
//         const post = new Post({
//             postTitle,
//             postContent,
//             postCode,
//             createdAt,
//             username,
//             comment,
//             file: req.file ? req.file.id : null // If file uploaded, save its ID
//         });
//         const savedPost = await post.save();
//         res.json(savedPost);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });

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