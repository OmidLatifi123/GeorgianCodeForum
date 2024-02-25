// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

import express from 'express';
const router = express.Router();
const nodemailer = require('nodemailer')
const {google} = require ('googleapis')
//const Post = require('../models/post')


const CLIENT_ID = '849012406795-0d8t4e9l146fs38dqsk7c3joam4c4b4l.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//049E5185_l_wpCgYIARAAGAQSNwF-L9IrrO1SXwV4VOIWQWNb7BN2iyvbE_4yCulsNCZ99S6LohESLzk3kIEomTLteFfci_SDUg4'

const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// import the index controller
import { DisplayHome, DisplayAbout, DisplayContact, DisplayCreate, DisplayFind, DisplayLogin, DisplayPrivacy } from '../Controllers';

/* GET Default Route */
router.get('/', (req, res, next)=>{DisplayHome(req, res, next);});

/* GET Home Page */
router.get('/home', (req, res, next)=>{DisplayHome(req, res, next);});

/* GET About Page */
router.get('/about', (req, res, next)=>{DisplayAbout(req, res, next);});

/* GET Create Page */
router.get('/create', (req, res, next)=>{DisplayCreate(req, res, next);});

/* GET Find Page */
router.get('/find', (req, res, next)=>{DisplayFind(req, res, next);});

/* GET Contact Page */
router.get('/contact', (req, res, next)=>{DisplayContact(req, res, next);});

/* GET privacy Page */
router.get('/privacy', (req, res, next)=>{DisplayPrivacy(req, res, next);});

/* GET login Page */
router.get('/login', (req, res, next)=>{DisplayLogin(req, res, next);});

//router.post('/create/add', (req, res) =>{
    //const post = new Post({
       // title: req.body.postTitle,
       // code: req.body.postCode,
       // description: req.body.postContent,
       // language:req.body.codingLanguage
   // });
   // post.save()
//})

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
        from: email,
        to: 'gcfhelpdesk1@gmail.com',
        subject: "GCF Support Ticket: " + name,
        text:  email +":" + issue,
    };

    const mailOptions2 ={
        from:'gcfhelpdesk1@gmail.com',
        to: email,
        subject: "Support Ticket Issued",
        text: "Your Support Ticket Has Been Sent. Our Team Will Contact You About Your Issues As Soon As Possible"
    };
  
     transport.sendMail(mailOptions)
     transport.sendMail(mailOptions2)
  
  })


export default router;