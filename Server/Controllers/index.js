/**
 * This function will display the home page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function DisplayHome(req, res, next)
{
  res.render('index', {title: 'Home', page: 'home'});
}

function DisplayAbout(req, res, next)
{
  res.render('index', {title: 'About Us', page: 'about'});
}

function DisplayCreate(req, res, next)
{
  res.render('index', {title: 'Create Post', page: 'create'});
}

function DisplayFind(req, res, next)
{
  res.render('index', {title: 'Find Post', page: 'find'});
}

function DisplayContact(req, res, next)
{
  res.render('index', {title: 'Contact Us', page: 'contact'});
}

function DisplayLogin(req, res, next)
{
  res.render('index', {title: 'Login', page: 'login'});
}

function DisplayPrivacy(req, res, next)
{
  res.render('index', {title: 'Privacy Policy', page: 'privacy'});
}

module.exports = {
 DisplayHome: DisplayHome,
 DisplayAbout: DisplayAbout,
 DisplayCreate: DisplayCreate,
 DisplayFind: DisplayFind,
 DisplayLogin: DisplayLogin,
 DisplayPrivacy: DisplayPrivacy,
 DisplayContact: DisplayContact
}

  