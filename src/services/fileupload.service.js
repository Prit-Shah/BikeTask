var multer = require('multer');
var path = require('path')
var upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (req.path === '/signup')
                cb(null, path.join(__dirname, "..", "..", "public", 'uploads', 'users'))
            else if (req.path === '/')
                cb(null, path.join(__dirname, "..", "..", "public", 'uploads', 'bikes'))
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + ".jpg")
        }
    })
}).single("photo");

module.exports = upload;