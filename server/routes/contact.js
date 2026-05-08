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
        const { title, message, email, website, challengeA, challengeB, challengeAnswer } = body;

        if (website) {
            console.warn("[Contact] Honeypot triggered, dropping request silently.");
            return res.send({ succes: "Send email..." });
        }

        const a = parseInt(challengeA, 10);
        const b = parseInt(challengeB, 10);
        const answer = parseInt(challengeAnswer, 10);
        if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(answer) || a + b !== answer) {
            return res.status(400).send({ error: "Math challenge failed." });
        }

        sendContactEmail(title, message, email).then(response => {
            res.send({ succes: "Send email..." });
        }).catch(err => {
            next(err);
        });
    });

    return router;
};
