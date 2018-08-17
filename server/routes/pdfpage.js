const express           = require('express');
const PDFPage           = require("../models/PDFPage");
const security          = require("../services/security");
const { userRoles }     = security;
const uploader          = require("../uploadHandlers/pdf");

const router  = express.Router();

module.exports = function ( io ) {    

    router.put(
        '/pdfpage/:pdfPageId', 
        security.protect([  userRoles.USER, userRoles.ADMIN ]), 
        uploader.single("new_pdf"), 
        function(req, res, next) 
    {
        const { pdfPageId } = req.params;
        let pdfPage = new PDFPage(req.body);
        pdfPage.pdf = req.file ? req.file.path : "uploads/" + pdfPage.pdf.split("uploads/")[1];
        PDFPage.findOneAndUpdate( { _id: pdfPageId }, pdfPage, { new: true }, ( err, pdfPageInDB ) => {
            if (err) return next(err);
            if (!pdfPageInDB)
            {
                return res.status(404).send("Not found");
            }
            res.send({ success: true, pdfPage: pdfPageInDB });
        });
    });

    router.get('/pdfpage', function(req, res, next) {
        const protocoll = req.connection.encrypted ? "https" : "http";
        PDFPage.find(( err, pdfPagesInDB ) => {
            if (err) return next( err );
            res.send( pdfPagesInDB.map( pdfPage => {
                if(pdfPage.pdf)
                {
                    pdfPage.pdf = protocoll + "://" + req.headers.host + "/" + pdfPage.pdf;
                }
                return pdfPage;
            }));
        });
    });

    router.get('/pdfpage/:pdfPageId', function(req, res, next) {
        const {pdfPageId } = req.params;
        const protocoll = req.connection.encrypted ? "https" : "http";
        PDFPage.findById( { _id: pdfPageId }, ( err, pdfPage ) => {
            if (err) return next( err );            
            if (!pdfPage)
            {
                return res.status(404).send("Not found");
            }
            if(pdfPage.pdf)
            {
                pdfPage.pdf = protocoll + "://" + req.headers.host + "/" + pdfPage.pdf;
            }
            res.send( pdfPage );
        });
    });

    return router;
};