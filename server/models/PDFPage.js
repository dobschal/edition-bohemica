const mongoose = require("mongoose");

var pdfPageSchema = mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    pdf: { type: String, required: true },    
    modifiedAt: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('PDFPage', pdfPageSchema);