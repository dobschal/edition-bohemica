const express = require('express');
const Product = require("../models/Product");
const security = require("../services/security");
const { userRoles } = security;
const uploader = require("../uploadHandlers/productImage");
const request = require("request");
const { sendContactEmail } = require("../services/email");

const router = express.Router();

module.exports = function (io) {

    router.post('/contact', function (req, res, next) {

        const body = req.body;
        const { title, message, email } = body;
        // const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

        // request.post(
        //     "https://www.google.com/recaptcha/api/siteverify",
        //     { 
        //         json: { 
        //             secret: "6LfMimwUAAAAAJlYQkmqOCApfwQpMwFVqtz1Ri_H",
        //             response: captcha,
        //             remoteip: ip
        //         }
        //     },
        //     (error, response, body) => 
        //     {
        //         if (!error && response.statusCode === 200)
        //         {
        sendContactEmail(title, message, email).then(response => {
            res.send({ succes: "Send email..." });
        }).catch(err => {
            next(err);
        });
        // }
        //         else
        //         {
        //             res.status(400).send({ error: "Captcha wrong", info: error });
        //         }
        //     }
        // );
    });

    return router;
};