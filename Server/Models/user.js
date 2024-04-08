// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const crypto = require('crypto');

// define schema for Media object
let userSchema = new mongoose.Schema({
    // email: {
    //     type: String,
    //     required: true
    // },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 8
    }
});



// inherit from passport-local-mongoose using the plugin() method
userSchema.plugin(plm);


// RESET PW ///////////////////////////////

// userSchema.methods.createResetPasswordToken = function(){
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     let passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     console.log(resetToken, this.passwordResetToken);

//     return resetToken;

// };

let User = mongoose.model('User', userSchema);
// let user = mongoose.model('User', userSchema.methods);

module.exports = User;

  