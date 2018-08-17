const multer = require("multer");

var pdfStorage = multer.diskStorage({
    destination: function (req, file, cb)
    {
      cb(null, './uploads');
    },
    filename: function (req, file, cb)
    {
      cb(null, "pdf-" + Date.now() + "-" + file.originalname );
    }
});

module.exports = multer({ storage: pdfStorage });