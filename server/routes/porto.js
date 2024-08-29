const express           = require('express');
const Porto           = require("../models/Porto");
const security          = require("../services/security");
const { userRoles }     = security;

const router  = express.Router();

module.exports = function ( io ) {    

    router.post('/porto', security.protect([  userRoles.USER, userRoles.ADMIN ]), function(req, res, next) {
        let porto = new Porto(req.body);
        porto.save((err, portoInDB) => {
            if (err) return next( err );
            res.send({ success: true, info: "Saved porto in database.", porto: portoInDB });
        });
    });

    router.delete('/porto/:id', security.protect([  userRoles.USER, userRoles.ADMIN ]), function(req, res, next) {
        Porto.find({ "_id": req.params.id }).remove( ( err ) => {
            if (err) return next( err );
            res.send({ success: true, info: "Remvoed porto from database." });
        });
    });

    router.get('/porto/:weight', function(req, res, next) {
        const weight = parseInt( req.params.weight );
        Porto.find(( err, portosFromDB ) => {
            if (err) return next( err );
            const porto = portosFromDB.find( porto => {
                return porto.weightFrom <= weight && porto.weightUpTo >= weight;
            });
            if(!porto)
            {
                res.status(404).send({ message: "No porto price found for requested weight." });
                return console.warn(`[Porto] Porto for weight ${weight}g not found!`);
            }
            res.send( porto );
        });
    });

    router.get('/porto', function(req, res, next) {
        Porto.find(( err, portosFromDB ) => {
            if (err) return next( err );
            res.send(portosFromDB);
        });
    });

    return router;
};
