var multer = require('multer');
const fs = require('fs')
const path = require('path')
var upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (req.path === '/signup') {
                const stpath = "./public/uploads/users";
                fs.mkdirSync(stpath, { recursive: true })
                cb(null, stpath)
            }
            else if (req.path === '/') {
                const stpath = "./public/uploads/bikes";
                fs.mkdirSync(stpath, { recursive: true })
                cb(null, stpath)
            }
        },
        filename: (req, file, cb) => {
            // console.log(path.extname(file.originalname))
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        },


    }),
    limits: {
        fileSize: 62500,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return cb(new Error("Allowed File Types png,jpeg,jpg."))
        }
        cb(null, true)
    },
}).single("photo");
module.exports = upload;