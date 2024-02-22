"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const CLIENT_ID = '849012406795-0d8t4e9l146fs38dqsk7c3joam4c4b4l.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//049E5185_l_wpCgYIARAAGAQSNwF-L9IrrO1SXwV4VOIWQWNb7BN2iyvbE_4yCulsNCZ99S6LohESLzk3kIEomTLteFfci_SDUg4';
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const Controllers_1 = require("../Controllers");
router.get('/', (req, res, next) => { (0, Controllers_1.DisplayHome)(req, res, next); });
router.get('/home', (req, res, next) => { (0, Controllers_1.DisplayHome)(req, res, next); });
router.get('/about', (req, res, next) => { (0, Controllers_1.DisplayAbout)(req, res, next); });
router.get('/create', (req, res, next) => { (0, Controllers_1.DisplayCreate)(req, res, next); });
router.get('/find', (req, res, next) => { (0, Controllers_1.DisplayFind)(req, res, next); });
router.get('/contact', (req, res, next) => { (0, Controllers_1.DisplayContact)(req, res, next); });
router.get('/privacy', (req, res, next) => { (0, Controllers_1.DisplayPrivacy)(req, res, next); });
router.get('/login', (req, res, next) => { (0, Controllers_1.DisplayLogin)(req, res, next); });
router.post("/contact/send_email", function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let issue = req.body.issue;
    const accessToken = oAuth2Client.getAccessToken();
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
    });
    const mailOptions = {
        from: email,
        to: 'gcfhelpdesk1@gmail.com',
        subject: "GCF Support Ticket: " + name,
        text: email + ":" + issue,
    };
    const mailOptions2 = {
        from: 'gcfhelpdesk1@gmail.com',
        to: email,
        subject: "Support Ticket Issued",
        text: "Your Support Ticket Has Been Sent. Our Team Will Contact You About Your Issues As Soon As Possible"
    };
    transport.sendMail(mailOptions);
    transport.sendMail(mailOptions2);
});
exports.default = router;
//# sourceMappingURL=index.js.map