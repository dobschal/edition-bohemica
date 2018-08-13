const mongoose = require("mongoose");

var contentSchema = mongoose.Schema({
    text: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    language: { type: String, required: true, default: "de" },
    modifiedAt: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Content', contentSchema);