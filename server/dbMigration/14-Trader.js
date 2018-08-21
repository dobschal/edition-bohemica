const Content = require("../models/Content");
const security = require("../services/security");

exports.id = '14-Trader-Content';

exports.up = done =>
{
    let content = new Content({        
        text: `Folgt...`,
        id: "trader-content"
    });

    content.save( err => {
        if( err ) throw err;
        done();
    });
};