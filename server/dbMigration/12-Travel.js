const Content = require("../models/Content");
const security = require("../services/security");

exports.id = '12-Travel-Content';

exports.up = done =>
{
    let content = new Content({        
        text: `Folgt...`,
        id: "travel-content"
    });

    content.save( err => {
        if( err ) throw err;
        done();
    });
};