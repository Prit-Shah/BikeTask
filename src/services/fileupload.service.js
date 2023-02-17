var multer = require('multer');
const fs = require('fs')
const path = require('path')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dycfoq3tx",
    api_key: "826762248647563",
    api_secret: "vSPygPEZcfC2MLNTPbIJHNMjS9k"
});
let fileName = "";
var upload = multer({

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // if (req.path === '/signup') {
            //     const stpath = "./public/uploads/users";
            //     fs.mkdirSync(stpath, { recursive: true })
            //     cb(null, stpath)
            // }
            // else if (req.path === '/') {
            //     const stpath = "./public/uploads/bikes";
            //     fs.mkdirSync(stpath, { recursive: true })
            //     cb(null, stpath)
            // }
            fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
            const res = cloudinary.uploader.upload(file, { public_id: fileName })

            res.then((data) => {
                console.log(data);
                console.log(data.secure_url);
            }).catch((err) => {
                console.log(err);
            });

            // Generate 
            const url = cloudinary.url(fileName, {
                width: 100,
                height: 150,
                Crop: 'fill'
            });

            // The output url
            console.log(url);
            fileName = url;
        },
        filename: (req, file, cb) => {
            // console.log(path.extname(file.originalname))
            cb(null, fileName);
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