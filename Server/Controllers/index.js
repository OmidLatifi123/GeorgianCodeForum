// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799


const User = require('../Models/user');
let Post = require('../Models/post');
/**
 * This function will display the home page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */



async function DisplayHome(req, res, next) {
  let post = await Post.find().sort({ createdAt: -1 }).limit(5);
  res.render('home', { title: 'Home', page: 'home', post: post });
}

// Repeat above for all pages

function DisplayAbout(req, res, next)
{
  res.render('about', {title: 'About Us', page: 'about'});
}

function DisplayCreate(req, res, next)
{
  res.render('create', {title: 'Create Post', page: 'create'});
}

function DisplayFind(req, res, next)
{
  res.render('find', {title: 'Find Post', page: 'find'});
}

function DisplayContact(req, res, next)
{
  res.render('contact', {title: 'Contact Us', page: 'contact'});
}

function DisplayLogin(req, res, next)
{
  res.render('login', {title: 'Login', page: 'login'});
}

function DisplayPrivacy(req, res, next)
{
  res.render('privacy', {title: 'Privacy Policy', page: 'privacy'});
}

function DisplayRegister(req, res, next)
{
  res.render('register', {title: 'Register', page: 'register'});
}


// FUNCTIONS MUST BE EXPORTED HERE OR CANNOT BE ACCESSED BY ROUTES
module.exports = {
 DisplayHome: DisplayHome,
 DisplayAbout: DisplayAbout,
 DisplayCreate: DisplayCreate,
 DisplayFind: DisplayFind,
 DisplayLogin: DisplayLogin,
 DisplayPrivacy: DisplayPrivacy,
 DisplayContact: DisplayContact,
 DisplayRegister: DisplayRegister
}

  