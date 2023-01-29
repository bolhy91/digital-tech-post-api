import cors from "cors";

export const PORT = process.env.PORT || 3000;
export const ATLAS_URI = process.env.ATLAS_URI;
export const corsOptions: cors.CorsOptions = {
    origin: process.env.ORIGIN
}