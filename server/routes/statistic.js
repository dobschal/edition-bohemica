const express           = require('express');
const Statistic         = require("../models/Statistic");
const security          = require("../services/security");
const uaParser          = require('ua-parser-js');
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

            let browsers = {};
            let browserVersion = {};
            let os = {};
            let osVersion = {};
            let dailyAccess = {};
            let allAccess = statistics.length;
            
            statistics.forEach( stat => {
                const info = uaParser( stat.userAgent );

                if( browsers[ info.browser.name ] )
                    browsers[ info.browser.name ]++;
                else
                    browsers[ info.browser.name ] = 1;

                if( browserVersion[ info.browser.name + "-" + info.browser.version ] )
                    browserVersion[ info.browser.name + "-" + info.browser.version ]++;
                else
                    browserVersion[ info.browser.name + "-" + info.browser.version ] = 1;
                
                if( osVersion[ info.os.name + "-" + info.os.version ] )
                    osVersion[ info.os.name + "-" + info.os.version ]++;
                else
                    osVersion[ info.os.name + "-" + info.os.version ] = 1;
                
                if( os[ info.os.name ] )
                    os[ info.os.name ]++;
                else
                    os[ info.os.name ] = 1;
                
                const day = stat.modifiedAt.toISOString().split("T")[0];

                if( dailyAccess[ day ] )
                    dailyAccess[ day ]++;
                else
                dailyAccess[ day ] = 1;
                
            });

            res.send({
                os, osVersion, browsers, browserVersion, dailyAccess, allAccess
            });

            // res.send( statistics.map( statistic => {
            //     const info = uaParser( statistic.userAgent );
            //     return {
            //         info,
            //         date: statistic.modifiedAt
            //     };
            // }));
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