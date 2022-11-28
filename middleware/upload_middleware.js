const multer  = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');
require('dotenv').config;

AWS.config.update({
    accessKeyId: process.env.S3_ACCES_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
})

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key(req, file, cb) {
            const { type } = req.body
            if(type === "img") {
                cb(null, `profile-img/${Date.now()}_${file.originalname}`);
            } else {
                cb(null, `mock-interview/${Date.now()}_${file.originalname}`);
            }
        },
    }),
    limits: { fileSize: 30 * 4800 * 4800 },
});

module.exports = upload;