const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../Controllers/auth');
const isAuthenticated = require('../Config/authCheck');

//  GET: /auth/register => display register form/
router.get('/register', (req, res, next) => {
    authController.displayRegisterForm(req, res, next);
});

// / POST: /auth/register => process registration attempt /
router.post('/register', (req, res, next) => {
    authController.submitRegister(req, res, next);
});

// / GET: /auth/login => display login form /
router.get('/login/', (req, res, next) => {
    authController.displayLoginForm(req, res, next);
});

router.get('/login/:invalid', (req, res, next) => {
    authController.displayLoginForm(req, res, next);
});

// / POST: /auth/login => process login attempt /
router.post('/login', (req, res, next) => {
    authController.submitLogin(req, res, next);
})

// / GET: /auth/logout => do the obvious 
router.get('/logout', (req, res, next) => {
    authController.logout(req, res, next);
})

router.get('/google',
    passport.authenticate('google',{scope:
    ['profile']}))

router.get('/google/callback',
    passport.authenticate('google',{failureRedirect: '/'}), (req, res, next)=>{
        res.redirect('/post')
    })

    router.get('/github',
    passport.authenticate('github',{scope:
    ['user:email']}))

router.get('/github/callback',
    passport.authenticate('github',{failureRedirect: '/'}), (req, res, next)=>{
        res.redirect('/post')
    })


    // REST/FOROGT PW ROUTER //////////////////////////////////////

router.post('/forgotPassword', (req, res, next) => {
    authController.forgotPassword(req, res, next);
});

router.post('/resetPassword', (req, res, next) => {
    authController.resetPassword(req, res, next);
});


module.exports = router;