const Content = require("../models/Content");
const security = require("../services/security");

exports.id = '02-AddDashboardTitle';

exports.up = done =>
{
    let content = new Content({        
        text: "This is an example ...",
        id: "dashboard-title"
    });

    content.save( err => {
        if( err ) throw err;
        done();
    });
};