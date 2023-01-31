"use strict";
exports.__esModule = true;
exports.multerStorage = void 0;
var multer_1 = require("multer");
var uuid_1 = require("uuid");
var aws_sdk_1 = require("aws-sdk");
var config_1 = require("../config/config");
var multer_s3_1 = require("multer-s3");
var spacesEndpoint = new aws_sdk_1["default"].Endpoint(config_1.AWS_BUCKET);
var s3 = new aws_sdk_1["default"].S3({
    accessKeyId: config_1.AWS_ACCESS_ID,
    secretAccessKey: config_1.AWS_SECRET_KEY,
    endpoint: spacesEndpoint
});
var fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.multerStorage = (0, multer_1["default"])({
    fileFilter: fileFilter,
    storage: (0, multer_s3_1["default"])({
        s3: s3,
        bucket: config_1.AWS_BUCKET_NAME,
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, "".concat((0, uuid_1.v4)(), ".jpg"));
        }
    })
}).array('image', 1);
