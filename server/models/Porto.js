const mongoose = require("mongoose");

var portoSchema = mongoose.Schema({
    name: { type: String, required: true },
    weightFrom: { type: Number, required: true },
    weightUpTo: { type: Number, required: true },
    countryCode: { type: String, required: true },
    price: { type: Number, required: true },
    modifiedAt: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Porto', portoSchema);