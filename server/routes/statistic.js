const express           = require('express');
const Statistic           = require("../models/Statistic");
const security          = require("../services/security");
const { userRoles }     = security;

const router  = express.Router();

module.exports = function ( io ) {    

    router.post('/statistic', function(req, res, next) {        
        let statistic = new Statistic(req.body);
        statistic.save( ( err, updatedContentInDB ) => {
            if (err) return next(err);
            res.send({ success: true });
        });
    });

    router.get('/statistic', function(req, res, next) {
        Statistic.find(( err, statistics ) => {
            if (err) return next( err );
            res.send( statistics );
        });
    });

    router.get('/statistic/count', function(req, res, next) {
        Statistic.count(( err, amount ) => {
            if (err) return next( err );
            res.send( { amount } );
        });
    });

    return router;
};