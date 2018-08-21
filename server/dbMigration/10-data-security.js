const Content = require("../models/Content");
const security = require("../services/security");

exports.id = '10-Data-Security';

exports.up = done =>
{
    let content = new Content({        
        text: `Folgt...`,
        id: "data-security-content"
    });

    content.save( err => {
        if( err ) throw err;
        done();
    });
};