"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVATAR_DEFAULT = exports.AWS_BUCKET_NAME = exports.AWS_BUCKET = exports.AWS_ACCESS_ID = exports.AWS_SECRET_KEY = exports.corsOptions = exports.ATLAS_URI = exports.JWT_SECRET = exports.PORT = void 0;
exports.PORT = process.env.PORT || 3000;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ATLAS_URI = process.env.ATLAS_URI;
exports.corsOptions = {
    origin: '*'
};
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
exports.AWS_ACCESS_ID = process.env.AWS_ACCESS_ID;
exports.AWS_BUCKET = process.env.AWS_BUCKET;
exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
exports.AVATAR_DEFAULT = 'https://digitaltech.nyc3.digitaloceanspaces.com/DEFAULT.jpg';
