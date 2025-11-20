
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const bucket = process.env.S3_BUCKET;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    acl: 'public-read',
    metadata: function (req, file, cb) { cb(null, {fieldName: file.fieldname}); },
    key: function (req, file, cb) {
      const ext = file.originalname.split('.').pop();
      cb(null, Date.now().toString() + '-' + Math.random().toString(36).slice(2,8) + '.' + ext);
    }
  })
});

module.exports = upload;
