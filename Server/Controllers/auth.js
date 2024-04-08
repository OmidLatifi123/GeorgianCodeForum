// User model for Auth
let User = require('../Models/user');
const passport = require('passport');
const sendEmail = require('../Utils/email');

let displayRegisterForm = (req, res, next) => {
    let messages = req.session.messages || [];
    req.session.messages = [];

    res.render('auth/register', { 
        title: 'Register',
        messages: messages
    });
};

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

//RESET PASSWORD //////////////////////////////////////////////////

// exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {

//     const user = await User.findOne({username: req.body.username})

//     if (!user) {
//         const error = new CustomError('User not found, try again with a registered email', 404);
//         next(error);
//     }

//    const resetToken = user.createResetPasswordToken();

//    await user.save({validateBeforeSave: false});

//     const resetUrl = `${req.protocol}`
//    await sendEmail();

// });

let forgotPassword = (req, res, next) => {
    res.render('auth/forgotPassword', { 
        title: 'Forgot Password',
        messages: messages
    });
};

let resetPassword = (req, res, next) => {

};

// make public
module.exports = {
    displayRegisterForm, displayLoginForm, 
    submitRegister, submitLogin, logout,
    forgotPassword, resetPassword
};