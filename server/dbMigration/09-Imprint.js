const Content = require("../models/Content");
const security = require("../services/security");

exports.id = '09-Imprint';

exports.up = done =>
{
    let content = new Content({        
        text: `Folgt...`,
        id: "imprint-content"
    });

    content.save( err => {
        if( err ) throw err;
        done();
    });
};