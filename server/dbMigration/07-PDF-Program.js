const PDFPage = require("../models/PDFPage");

exports.id = '07-PDF-Program';

exports.up = done =>
{
    const pdfPage = new PDFPage({        
        _id: "program",
        pdf: "missing",
        title: "navigation.program" // lokalisiert
    });

    pdfPage.save( err => {
        if( err ) throw err;
        done();
    });
};