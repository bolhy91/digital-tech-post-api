import cors from "cors";

export const PORT = process.env.PORT || 3000;
export const corsOptions: cors.CorsOptions = {
    origin: process.env.ORIGIN
}