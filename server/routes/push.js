const express = require('express');
const router  = express.Router();
const webPush = require("web-push");
const PushSubscription = require("../models/PushSubscription");

const publicKey = process.env.WEB_PUSH_PUBLIC_KEY;
const privateKey = process.env.WEB_PUSH_PRIVATE_KEY;

module.exports = function( io ) {

    webPush.setVapidDetails("mailto:sascha@dobschal.eu", publicKey, privateKey );

    router.post('/push/register', function(req, res, next) {
        let subscription = req.body;
        let notificationPayload = JSON.stringify({ title: "Welcome!", body: "Pushs are now available." });

        let pushSubscription = new PushSubscription( { subscription: JSON.stringify(subscription) } );
        pushSubscription.save((dbError, savedSubscription) => {
            if (dbError) return next( dbError );
            webPush.sendNotification( subscription, notificationPayload )
            .then(res.send({ success: true, subscription: savedSubscription }))
            .catch( err => next(err) );
        });
    });

    router.post('/push/sendall', function(req, res, next) {
        let { title, body } = req.body;
        let notificationPayload = JSON.stringify({ title, body });
        PushSubscription.find( (dbError, subscriptions) => {
            if (dbError) return next( dbError );
            subscriptions.forEach( subscriptionWrapper => {
                let subscription = JSON.parse( subscriptionWrapper.subscription );
                webPush.sendNotification( subscription, notificationPayload )
                .then( console.log("[Push] Sent successful.") )
                .catch( err => {
                    console.error( "[Push] Error on sending push! ", err );
                });
            });
        });   
        res.send({ success: true });
    });

    return router;
};