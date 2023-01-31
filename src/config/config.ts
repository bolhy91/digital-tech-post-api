import cors from "cors";

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ATLAS_URI = process.env.ATLAS_URI;
export const corsOptions: cors.CorsOptions = {
    origin: '*'
};
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY_BC;
export const AWS_ACCESS_ID = process.env.AWS_ACCESS_ID;
export const AWS_BUCKET = process.env.AWS_BUCKET;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AVATAR_DEFAULT= 'https://digitaltech.nyc3.digitaloceanspaces.com/DEFAULT.jpg';
