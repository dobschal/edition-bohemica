const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: { type: String, required: true }, // often emaila and username is the same
    email: { type: String, required: true },
    password: { type: String, required: true },
    userRole: { type: String, required: true },
    registeredAt: { type: Date, required: true },
    valid: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('User', userSchema);