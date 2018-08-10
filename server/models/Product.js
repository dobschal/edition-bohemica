const mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    isbn: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    public: { type: Boolean, required: true, default: false },
    image: { type: String, required: false, default: "" },
    modifiedAt: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Product', productSchema);