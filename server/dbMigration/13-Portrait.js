const Content = require("../models/Content");
const security = require("../services/security");

exports.id = '13-Protrait-Content';

exports.up = done =>
{
    let content = new Content({        
        text: `Folgt...`,
        id: "portrait-content"
    });

    content.save( err => {
        if( err ) throw err;
        done();
    });
};