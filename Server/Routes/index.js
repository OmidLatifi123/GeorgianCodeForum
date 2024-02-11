// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

const express = require('express');
const router = express.Router();

// import the index controller
const IndexController = require('../Controllers/index');

/* GET Default Route */
router.get('/', (req, res, next)=>{IndexController.DisplayHome(req, res, next);});

/* GET Home Page */
router.get('/home', (req, res, next)=>{IndexController.DisplayHome(req, res, next);});

/* GET About Page */
router.get('/about', (req, res, next)=>{IndexController.DisplayAbout(req, res, next);});

/* GET Create Page */
router.get('/create', (req, res, next)=>{IndexController.DisplayCreate(req, res, next);});

/* GET Find Page */
router.get('/find', (req, res, next)=>{IndexController.DisplayFind(req, res, next);});

/* GET Contact Page */
router.get('/contact', (req, res, next)=>{IndexController.DisplayContact(req, res, next);});

/* GET privacy Page */
router.get('/privacy', (req, res, next)=>{IndexController.DisplayPrivacy(req, res, next);});

/* GET login Page */
router.get('/login', (req, res, next)=>{IndexController.DisplayLogin(req, res, next);});


module.exports = router;