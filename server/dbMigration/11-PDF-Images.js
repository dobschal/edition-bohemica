const PDFPage = require("../models/PDFPage");

exports.id = '11-PDF-Images';

exports.up = done =>
{
    const pdfPage = new PDFPage({        
        _id: "images",
        pdf: "images",
        title: "navigation.images" // lokalisiert
    });

    pdfPage.save( err => {
        if( err ) throw err;
        done();
    });
};