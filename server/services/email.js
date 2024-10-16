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

/**
 *  @param {string} title - subject of the email
 *  @param {string} message - 
 *  @param {string} sendersEmail - senders mail
 *  @returns {promise} sendingMail
 */
function sendContactEmail( title, message, sendersEmail )
{
    return email.send({
        template: 'contact',
        message: {
            to: process.env.ADMIN_EMAIL + ";" + process.env.MODERATOR_EMAIL
        },
        locals: { title, message, sendersEmail }
    });
    // .then( () => console.log("[Email] Sent e-mail for contact successully.") )
    // .catch( err => console.error("[Email] Unable to send contact email. ", err) );
}

/**
 *  @param {object} data - data for the template
 *  @returns {promise} sendingMail
 */
function  sendOrderEmailToProducer( data )
{
    data = JSON.parse( JSON.stringify(data) );
    data.totalPrice = parseFloat( data.totalPrice ).toFixed(2).replace(".", ",");
    data.totalPorto = parseFloat( data.totalPorto ).toFixed(2).replace(".", ",");
    data.title = `Neue Bestellung, ${data.orderId}, edition bohemica`;
    return email.send({
        template: 'orderForProducer',
        message: {
            to: process.env.ADMIN_EMAIL + ";" + process.env.MODERATOR_EMAIL
        },
        locals: data
    });
}

/**
 *  @param {object} data - data for the template
 *  @returns {promise} sendingMail
 */
function sendOrderEmailToCustomer( customersEmail, data )
{
    data = JSON.parse( JSON.stringify(data) );
    data.totalPrice = parseFloat( data.totalPrice ).toFixed(2).replace(".", ",");
    data.totalPorto = parseFloat( data.totalPorto ).toFixed(2).replace(".", ",");
    data.title = `Ihre Bestellung bei edition bohemica, ${data.orderId}`;
    return email.send({
        template: 'orderForCustomer',
        message: {
            to: customersEmail + ";" + process.env.ADMIN_EMAIL
        },
        locals: data
    });
}

module.exports = { sendRegistrationEmail, sendContactEmail, sendOrderEmailToCustomer, sendOrderEmailToProducer };
