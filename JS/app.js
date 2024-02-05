// Make the text in the text area a place holder rather than actual text
// document.getElementById('issue').addEventListener('click', function() {
//      this.removeAttribute('placeholder');
// });
const issue = document.getElementById('issue');
const email = document.getElementById('email');



// Declaring dependencies
const nodemailer = require('nodemailer')
const {google} = require ('googleapis')

// ID's and Tokens
const CLIENT_ID = '673301331048-th2ddvg7tmsdgm5le7bnj57kg5ck9d0c.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04rRHwzJR3cGoCgYIARAAGAQSNwF-L9IrN_HhIzC86_4imWhwPv8iTX3pOEuzBPkpis4yMuOKZs9YWlg5OYUC6qhBTBcslQJ75eQ'

const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


document.getElementById('contact').addEventListener('submit', sendEmails(issue, email)); {
    // Get the values from the form

    alert("Form Submitted")

    function sendEmails(issue, email){
    alert("Email A Sending")
    sendMailSupport(issue, email)
    .then(result => console.log('email sent...', result))
    .catch(error => console.log(error.message))
    alert("Email B Sending")
    sendMailClient(issue, email)
    .then(result => console.log('email sent...', result))
    .catch(error => console.log(error.message))
    }

    // Call your function with the captured values
};

// Send mail to support team (us)
async function sendMailSupport(issue, email){

    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'cdasilv1@lakeheadu.ca', //We can't change this yet
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: email,
            to: 'kaiic6@gmail.com',
            subject: "Supoort Ticket",
            text: issue,
        };

        const result = transport.sendMail(mailOptions)
        return result
        
    } catch (error) {
        return error
    }
}

// Send mail to client
async function sendMailClient(){

    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'cdasilv1@lakeheadu.ca', //We can't change this yet
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: "cdasilv1@lakeheadu.ca",
            to: email,
            subject: "Support Ticket",
            text: 'Your support ticket has been sent.',
        };
        
        const result = transport.sendMail(mailOptions)
        return result
        
    } catch (error) {
        return error
    }
}

