const Content = require("../models/Content");
const security = require("../services/security");

exports.id = '08-AGB';

exports.up = done =>
{
    let content = new Content({        
        text: `Folgt...`,
        id: "agb-content"
    });

    content.save( err => {
        if( err ) throw err;
        done();
    });
};