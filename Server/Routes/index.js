// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const {google} = require ('googleapis')

const CLIENT_ID = '849012406795-0d8t4e9l146fs38dqsk7c3joam4c4b4l.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04E4tpUzrs4XNCgYIARAAGAQSNwF-L9IrKhTXZ6LlGNCb7iPEWPE5CCcnD-GBOVDMk6jdqeB_ufVpOzsUZdO28xUOd1ZxI1xunTs'

const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

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

router.post("/contact/send_email", function(req, res){
    let name = req.body.name;
    let email = req.body.email;
    let issue = req.body.issue;
  
    const accessToken = oAuth2Client.getAccessToken()
  
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'gcfhelpdesk1@gmail.com', 
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    })
  
    const mailOptions = {
        from: 'gcfhelpdesk1@gmail.com',
        to: 'kaiic6@gmail.com',
        subject: "Support Ticket",
        text: "Your Support Ticket Has Been Sent",
    };
  
     transport.sendMail(mailOptions)
  
     res.redirect('/')
  })


module.exports = router;