const mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    isbn: { type: String, required: true },
    description: { type: String, required: true },
    additionalInfo: { type: String, required: false },
    weight: { type: Number, required: true, default: 500 }, // in gramm
    price: { type: Number, required: true },
    public: { type: Boolean, required: true, default: false },
    hasPorto: { type: Boolean, required: true, default: false },
    image: { type: String, required: false, default: "" },
    sortIndex: { type: Number, required: true, default: 0 },
    modifiedAt: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Product', productSchema);