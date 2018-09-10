const mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: false, default: "" },
    isbn: { type: String, required: false, default: "ohne" },
    description: { type: String, required: false, default: "" },
    additionalInfo: { type: String, required: false, default: "" },
    weight: { type: Number, required: true, default: 500 }, // in gramm
    price: { type: Number, required: true },
    public: { type: Boolean, required: true, default: false },
    isInPreparation: { type: Boolean, required: true, default: true },
    hasPorto: { type: Boolean, required: true, default: false },
    image: { type: String, required: false, default: "" },
    sortIndex: { type: Number, required: true, default: 0 },
    modifiedAt: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Product', productSchema);