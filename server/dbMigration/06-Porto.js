const Porto = require("../models/Porto");

exports.id = '06-Porto';

exports.up = done =>
{
    const porto = new Porto({        
        name: "big",
        weightFrom: 2001,
        weightUpTo: 5000,
        price: 6.99,
        countryCode: "DE"
    });

    porto.save( err => {
        if( err ) throw err;
        done();
    });
};