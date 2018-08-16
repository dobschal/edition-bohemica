const Porto = require("../models/Porto");

exports.id = '05-Porto';

exports.up = done =>
{
    const porto = new Porto({        
        name: "normal",
        weightFrom: 0,
        weightUpTo: 2000,
        price: 4.50,
        countryCode: "DE"
    });

    porto.save( err => {
        if( err ) throw err;
        done();
    });
};