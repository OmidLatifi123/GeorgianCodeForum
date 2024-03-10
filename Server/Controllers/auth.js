// User model for Auth
let User = require('../Models/user');
const passport = require('passport');

let displayRegisterForm = (req, res, next) => {
    let messages = req.session.messages || [];
    req.session.messages = [];

    res.render('auth/register', { 
        title: 'Register',
        messages: messages
    });
};

// let submitRegister = (req, res, next) => {
//     // Check if email or username already exists
//     User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }, (err, existingUser) => {
//         if (err) {
//             // Handle error
//             return res.render('/auth/register', { messages: err });
//         }
//         if (existingUser) {
//             // User with the same email or username already exists
//             let errorMessage = "Email or username already exists.";
//             return res.render('/auth/register', { messages: errorMessage });
//         }
//         // Proceed with registration if email and username are unique
//         User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, (err, newUser) => {
//             if (err) {
//                 return res.render('/auth/register', { messages: err });
//             } else {
//                 req.login(newUser, (err) => {
//                     res.redirect('/post');
//                 });
//             }
//         });
//     });
// };

let submitRegister = (req, res, next) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, newUser) => {
        if (err) {
            return res.render('auth/register', { messages: err });
        }
        else {
            req.login(newUser, (err) => {
                res.redirect('/post');
            });
        }
    });
};

let displayLoginForm = (req, res, next) => {
    let messages = '';

    console.log(req.params);
    if (req.params.invalid) {
        messages = 'Invalid Login';
    }

    res.render('auth/login', { 
        title: 'Login', 
        messages: messages 
    });
};

let submitLogin = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        console.log(err);
        if (err) {
            return res.redirect('/auth/login/invalid');
        }
        else {
            req.login(user, (err) => {
                if (user) {
                    return res.redirect('/post');
                }
                else {
                    return res.redirect('/auth/login/invalid');
                }             
            });
        }
    })(req, res, next);
};

let logout = (req, res, next) => {
    req.logout((err) => {
        return res.redirect('/');
    })
};

// make public
module.exports = {
    displayRegisterForm, displayLoginForm, submitRegister, submitLogin, logout
};