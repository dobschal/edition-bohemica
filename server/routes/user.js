const express = require('express');
const router  = express.Router();
const security = require("../services/security");
const { userRoles } = security;
const User = require("../models/User");
const email = require("../services/email");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = function( io ) {

    router.get("/users", security.protect([ userRoles.USER, userRoles.ADMIN ]), function( req, res, next) {
        User.find({}, (err, usersFromDB) => {
            if (err)
            {
                err.status = 500;
                return next( err );
            }
            res.status(200).send( usersFromDB );
        });
    });

    router.get("/users/:username", function( req, res, next) {
        const { username } = req.params;

        User.findOne({ username: username }, (err, userFromDB) => {
            if (err)
            {
                err.status = 500;
                return next( err );
            }
            if (!userFromDB)
            {
                let conflictError = new Error("User does not exist.");
                conflictError.status = 404;
                return next( conflictError );
            }
            let { username: usernameFromDB, userRole } = userFromDB;
            res.status(200).send({ username: usernameFromDB, userRole });
        });
    });

    return router;
};