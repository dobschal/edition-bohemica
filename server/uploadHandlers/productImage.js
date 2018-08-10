const multer = require("multer");

var productImageStorage = multer.diskStorage({
    destination: function (req, file, cb)
    {
      cb(null, './uploads');
    },
    filename: function (req, file, cb)
    {
      cb(null, "product-image-" + Date.now() + "-" + file.originalname );
    }
});

module.exports = multer({ storage: productImageStorage });