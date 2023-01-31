import multer from "multer";
import {v4} from 'uuid';
import path from 'path';
import aws from 'aws-sdk';
import {AWS_ACCESS_ID, AWS_SECRET_KEY, AWS_BUCKET, AWS_BUCKET_NAME} from "../config/config";
import multerS3 from 'multer-s3';
import {S3Client} from "@aws-sdk/client-s3";

const spacesEndpoint = new aws.Endpoint(AWS_BUCKET);
const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_ID,
    secretAccessKey: AWS_SECRET_KEY,
    endpoint: spacesEndpoint
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

export const multerStorage = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            cb(null, `${v4()}.jpg`)
        }
    })
}).array('image', 1);