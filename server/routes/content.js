const express           = require('express');
const Content           = require("../models/Content");
const security          = require("../services/security");
const { userRoles }     = security;

const router  = express.Router();

module.exports = function ( io ) {    

    router.put('/content/:contentId', security.protect([  userRoles.USER, userRoles.ADMIN ]), function(req, res, next) {
        const { contentId } = req.params;
        let updatedContent = new Content(req.body);        
        Content.findOneAndUpdate( { id: contentId }, updatedContent, { new: true }, ( err, updatedContentInDB ) => {
            if (err) return next(err);
            res.send({ success: true, content: updatedContentInDB });
            io.emit( "ContentChanged", updatedContentInDB );
        });
    });

    router.get('/content', function(req, res, next) {
        Content.find(( err, contentsFromDB ) => {
            if (err) return next( err );
            res.send( contentsFromDB );
        });
    });

    router.get('/content/:contentId', function(req, res, next) {
        const {contentId } = req.params;
        Content.findOne( { id: contentId }, ( err, contentFromDB ) => {
            if (err) return next( err );                       
            res.send( contentFromDB );
        });
    });

    return router;
};
