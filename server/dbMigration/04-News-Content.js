const Content = require("../models/Content");
const security = require("../services/security");

exports.id = '04-AddNewsContent';

exports.up = done =>
{
    let content = new Content({        
        text: "This is an example ...2",
        id: "news-content"
    });

    content.save( err => {
        if( err ) throw err;
        done();
    });
};