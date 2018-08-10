const jwt = require("jsonwebtoken");
const hash = require('js-sha512');
const secret = process.env.SECRET;

const userRoles = Object.freeze({
    "ADMIN": "admin",
    "USER": "user",
    "MODERATOR": "moderator"
});

/**
 *  @param {array} allowedUserRoles - Array of strings with the user roles like "admin", "user", "moderator"
 *  @returns {void} - Middleware for route, call next() when finished
 */
function protect( allowedUserRoles )
{
    return ( req, res, next ) => {
        try {
            let authHeader = req.headers["authorization"];
            let splittedAuthHeader = authHeader.split(" "); // remove "bearer" from authorization header
            let token = splittedAuthHeader[ 1 ];
            return jwt.verify( token, secret, (err, data) => {
                
                let isTokenExpired = !data.expiration || Date.now() > data.expiration;

                if( err || !allowedUserRoles.includes( data.userRole ) || isTokenExpired )
                {
                    console.warn(`[Security] User token validation failed.
                        \n    Right user role? ${allowedUserRoles.includes( data.userRole )}
                        \n    Token expired? ${isTokenExpired}
                        \n    Error? ${err ? err.message : "no"}
                    `);
                    let permissionError = new Error("Permission denied.");
                    permissionError.status = 403;
                    return next( permissionError );
                }

                req.token = token;
                req.tokenData = data;
                return next();
            });
        } catch(e) {
            console.error("[Security] Error on parsing token: ", e);
            let permissionError = new Error("Permission denied.");
            permissionError.status = 403;
            return next( permissionError );
        }
    };
}

/**
 *  @param {string} username - unique for user
 *  @param {string} userRole - "admin", "user", "moderator"
 *  @param {string} userId - db id
 *  @returns {string} token
 */
function getValidationToken( username, userRole, userId )
{
    return jwt.sign( { userRole, username, userId, action: "validation" }, secret);
}

/**
 *  @param {string} username - unique for username
 *  @param {string} userRole - "admin", "user", "moderator"
 *  @param {string} userId - db id
 *  @returns {string} token
 */
function getToken( username, userRole, userId )
{
    let expiration = Date.now() + process.env.TOKEN_EXPIRATION;
    return jwt.sign( { userRole, username, userId, expiration }, secret);
}

/**
 *  @param {string} plaintextPassword - Password that should be hashed
 *  @returns {string} hashedPassword
 */
function hashPassword( plaintextPassword )
{
    return hash.sha512( plaintextPassword + secret );
}

module.exports = { getToken, protect, hashPassword, getValidationToken, userRoles };