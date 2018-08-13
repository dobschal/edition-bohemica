const mongoose = require("mongoose");

var statisticSchema = mongoose.Schema({
    userAgent: { type: String, required: true },    
    modifiedAt: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Statistic', statisticSchema);