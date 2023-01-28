import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors';
import {corsOptions, PORT} from "./config/config";

const app = express();

/**
   ## Configuration ##
**/
app.use(cors(corsOptions));
app.use(express.json());

app.get('/api', (_, res) => {
    res.send('the api run');
});

app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
});

export { app }