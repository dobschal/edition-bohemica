const User = require("../models/User");
const security = require("../services/security");

exports.id = 'AddAdmin';

exports.up = done =>
{
    let adminUser = new User({
        username: process.env.ADMIN_USERNAME,
        password: security.hashPassword( process.env.ADMIN_PASSWORD ),
        valid: true,
        email: process.env.ADMIN_EMAIL,
        userRole: "admin",
        registeredAt: new Date()

    });
    adminUser.save( err => {
        if( err ) throw err;
        done();
    });
};