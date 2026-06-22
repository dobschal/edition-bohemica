const express = require('express');
const { sendWithdrawalEmail } = require("../services/email");

const router = express.Router();

module.exports = function (io) {

    router.post('/withdrawal', function (req, res, next) {

        const body = req.body;
        const { name, orderId, email, website, challengeA, challengeB, challengeAnswer } = body;

        if (website) {
            console.warn("[Withdrawal] Honeypot triggered, dropping request silently.");
            return res.send({ success: "Send email..." });
        }

        const a = parseInt(challengeA, 10);
        const b = parseInt(challengeB, 10);
        const answer = parseInt(challengeAnswer, 10);
        if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(answer) || a + b !== answer) {
            return res.status(400).send({ error: "Math challenge failed." });
        }

        if (!name || !orderId || !email) {
            return res.status(400).send({ error: "Missing input." });
        }

        sendWithdrawalEmail(name, orderId, email).then(response => {
            res.send({ success: "Send email..." });
        }).catch(err => {
            next(err);
        });
    });

    return router;
};
