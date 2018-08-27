const PDFPage = require("../models/PDFPage");

exports.id = '15-Correspondence';

exports.up = done =>
{
    const pdfPage = new PDFPage({        
        _id: "correspondence",
        pdf: "correspondence.pdf",
        title: "navigation.correspondence" // lokalisiert
    });

    pdfPage.save( err => {
        if( err ) throw err;
        done();
    });
};