const Email         = require('email-templates');
const nodemailer    = require('nodemailer');
const path          = require("path");

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const email = new Email({
    message: {
        from: process.env.EMAIL_SENDER
    },
    send: true, // If set to false, this will display the email in the browser for debugging!!!
    transport: transporter,
    views: {
        options: {
            extension: 'ejs' // <---- HERE
        }
    },
    juice: true,
    juiceResources: {
        preserveImportant: true,
        webResources: {
            relativeTo: path.resolve('emails')
        }
    }
});

/**
 *  @param {string} username - username of the new registered user
 *  @param {string} emailOfUser - receiver for the registration email
 *  @param {string} validationLink - link for the user to validate the account
 *  @returns {promise} sendingMail
 */
function sendRegistrationEmail( username, emailOfUser, validationLink )
{

    // TODO: Add localization...

    return email.send({
        template: 'registration',
        message: {
            to: emailOfUser
        },
        locals: { username, validationLink }
    })
    .then( () => console.log("[Email] Sent e-mail for registration successully.") )
    .catch( err => console.error("[Email] Unable to send registration email. ", err) );
}

module.exports = { sendRegistrationEmail };