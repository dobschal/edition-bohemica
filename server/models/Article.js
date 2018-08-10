const mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    modifiedAt: { type: Date, required: true },
    images: [
        {
            file : String,
            sortIndex : Number,
            status : String,
            modifiedAt : Date
        }
    ]
});

module.exports = mongoose.model('Article', articleSchema);