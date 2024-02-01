var Email = require('path/to/email').Email
var myMsg = new Email(
{ from: "cdasilv1@example.com"
, to:   "you@example.com"
, subject: "Knock knock..."
, body: "Who's there?"
})

// if callback is provided, errors will be passed into it
// else errors will be thrown
myMsg.send(function(err){ ... })

var lib = require('path/to/email')
  , Email = lib.Email;
    
lib.from = 'someAddress@youAlwaysSendFrom.com'

// no need to set the from property, already set
var mail = new Email(
{ to: "you@example.com"
, subject: "Knock knock..."
, body: "Who's there?"
})
mail.send()