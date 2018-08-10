const multer = require("multer");

var articleImageStorage = multer.diskStorage({
    destination: function (req, file, cb)
    {
      cb(null, './uploads');
    },
    filename: function (req, file, cb)
    {
      cb(null, "article-image-" + Date.now() + "-" + file.originalname );
    }
});

module.exports = multer({ storage: articleImageStorage });