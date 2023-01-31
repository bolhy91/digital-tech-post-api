"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config/config");
const multer_s3_1 = __importDefault(require("multer-s3"));
const spacesEndpoint = new aws_sdk_1.default.Endpoint(config_1.AWS_BUCKET);
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: config_1.AWS_ACCESS_ID,
    secretAccessKey: config_1.AWS_SECRET_KEY,
    endpoint: spacesEndpoint
});
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.multerStorage = (0, multer_1.default)({
    fileFilter: fileFilter,
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: config_1.AWS_BUCKET_NAME,
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `${(0, uuid_1.v4)()}.jpg`);
        }
    })
}).array('image', 1);
