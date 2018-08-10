const mongoose = require("mongoose");

var pushSubscriptionSchema = mongoose.Schema({
    subscription: { type: String, required: true }
});

module.exports = mongoose.model('PushSubscription', pushSubscriptionSchema);