const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const ObjectId = Schema.ObjectId;

var articleCommentSchema = mongoose.Schema({
    articleId: { type: ObjectId, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    modifiedAt: { type: Date, required: true }
});

module.exports = mongoose.model('ArticleComment', articleCommentSchema);