const express   = require('express');
const path      = require("path");
const sharp     = require("sharp");

const router  = express.Router();

/**
 *  @description This script loads an image from the uploads folder
 *  If a query is given the image will be resized:
 *  queries: width, height
 *  Example: mydomain.com/uploads/filename-here.jpg?width=200&height=500
 */

module.exports = function ()
{
    router.get('/uploads/:filename', function( req, res, next ) {
        let { filename } = req.params;
        let { width, height } = req.query;
        try {
            if( width && height )
            {            
                sharp( path.resolve( "uploads/" + filename ) ).resize( parseInt(width, 10), parseInt(height, 10) ).toBuffer().then( data => {
                    res.setHeader("Content-Type", "image/png");
                    res.send( data );
                } )
                .catch( err => {
                    next( err );
                });                
            }
            else if( width && !height )
            {
                sharp( path.resolve( "uploads/" + filename ) ).resize( parseInt(width, 10) ).toBuffer().then( data => {
                    res.setHeader("Content-Type", "image/png");
                    res.send( data );
                } )
                .catch( err => {
                    next( err );
                });
            }
            else
            {
                res.sendFile( path.resolve( "uploads/" + filename ) );
            }
        } catch(e) {
            console.error("[FileService] Error getting file: ", e);
            return next(e);
        }
    });

    return router;
};
